import { NextResponse } from "next/server";
import { prisma } from "../../../db/lib/prisma";
import { revalidateTag } from "next/cache";
import { AppointmentProps } from "@/types/api.types";


export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const day = url.searchParams.get("day");
        const month = url.searchParams.get("month");

        let filter = {};

        if (day && month) {
            // Construir intervalo para o filtro de data, exemplo para todo o dia
            const year = new Date().getFullYear();
            const monthIndex = Number(month) - 1; // mês zero-based

            const startDate = new Date(year, monthIndex, Number(day), 0, 0, 0);
            const endDate = new Date(year, monthIndex, Number(day), 23, 59, 59);

            filter = {
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            };
        }

        const appointments = await prisma.appointment.findMany({
            where: filter,
            orderBy: { date: "asc" },
        });

        return NextResponse.json(appointments, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Erro ao buscar agendamentos" },
            { status: 500 }
        );
    }
}


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            name,
            email,
            telefone,
            selectedDay,
            selectedMonth,
            horas,
        }: AppointmentProps = body;

        if (
            !name ||
            !email ||
            !telefone ||
            selectedDay == null ||
            selectedMonth == null ||
            !horas
        ) {
            return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
        }

        // validação simples do mês
        if (selectedMonth < 0 || selectedMonth > 11) {
            return NextResponse.json({ error: "Mês inválido" }, { status: 400 });
        }

        const [hour, minute] = horas.split(":");
        const date = new Date();
        date.setFullYear(new Date().getFullYear(), selectedMonth, selectedDay);
        date.setHours(Number(hour), Number(minute), 0, 0);

        // Verifica se já existe agendamento no mesmo horário
        const existing = await prisma.appointment.findFirst({
            where: { date },
        });

        if (existing) {
            return NextResponse.json(
                { error: "Horário já ocupado" },
                { status: 409 }
            );
        }

        const created = await prisma.appointment.create({
            data: {
                name,
                email,
                telefone,
                date,
            },
        });

        revalidateTag("appointments", "default");

        return NextResponse.json(created, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const { id, status } = await req.json();

        const validStatus = ["agendado", "finalizado", "cancelado"];

        if (!id || !status) {
            return NextResponse.json(
                { error: "ID e status são obrigatórios" },
                { status: 400 }
            );
        }

        if (!validStatus.includes(status)) {
            return NextResponse.json({ error: "Status inválido" }, { status: 400 });
        }

        const appointment = await prisma.appointment.findUnique({
            where: { id },
        });

        if (!appointment) {
            return NextResponse.json(
                { error: "Agendamento não encontrado" },
                { status: 404 }
            );
        }

        const now = new Date();
        const isPast = appointment.date < now;

        // Se a data já passou e não for finalizado, atualiza pra cancelado
        let finalStatus = status;
        if (isPast && status !== "finalizado") {
            finalStatus = "cancelado";
        }

        const updated = await prisma.appointment.update({
            where: { id },
            data: { status: finalStatus },
        });

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        console.error("Erro ao atualizar status:", error);
        return NextResponse.json(
            { error: "Erro ao atualizar status" },
            { status: 500 }
        );
    }
}
