
import { conn_training } from "@/libs/conn_training"
import { NextResponse } from "next/server"


export async function POST(req) {
    const reqData = await req.json()

    const data = await conn_training.query(`SELECT * FROM empleados WHERE gafete =  ${reqData.employee}`);

    const employee = data[0]
    let procesos_tomados
    if(employee != undefined){
         procesos_tomados = await conn_training.query(`SELECT *
        FROM procesos_tomados
        LEFT JOIN procesos ON procesos_tomados.id_proceso = procesos.id_proceso
        WHERE procesos_tomados.id_empleado = ${data[0].ID_Empleado} AND procesos_tomados.fecha > 0`);
    

    }


    
    return NextResponse.json({procesos_tomados, employee})
}