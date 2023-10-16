import { b10_bartender } from "@/libs/conn_b10_bartender"
import { conn_b10 } from "@/libs/conn_b10"
import { NextResponse } from "next/server"


export async function GET() {
    const data = await b10_bartender.query('SELECT * FROM sem WHERE CAST(current_stock AS INT) < CAST(minimum_stock AS INT)');
    return NextResponse.json({data})
}

export async function POST(req) {

    const reqData = await req.json()
    const emp = await conn_b10.query(`SELECT * FROM empleados WHERE emp_tag = ${reqData.employee} AND emp_area = 'SUB_DELX'`)
    if(emp.length == 0){
        return NextResponse.json({error: 'Empleado no autorizado'})
    }else{
        const data = await b10_bartender.query(`UPDATE sem SET current_employee = '${emp[0].emp_name}' WHERE id = ${reqData.id}`)
        return NextResponse.json({data, emp})
    }
   
}

export async function PUT(req) {

    const reqData = await req.json()
    const emp = await conn_b10.query(`SELECT * FROM empleados WHERE emp_tag = ${reqData.employee} AND emp_area = 'SUB_DELX' AND emp_sup = 1`)
    if(emp.length == 0){
        return NextResponse.json({error: 'Empleado no autorizado'})
    }else{
        const data = await b10_bartender.query(`UPDATE sem SET current_employee = '' WHERE current_employee != '' `)
        return NextResponse.json({data})
    }
}