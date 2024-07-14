import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import React, { FC } from "react";

import { ITableData } from "../../@types/ITableData";

interface IGeneralTableProps {
  data: ITableData[];
}

const GeneralTable: FC<IGeneralTableProps> = ({ data }) => {

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="income" stroke="green"/>
        <Line type="monotone" dataKey="expense" stroke="red"/>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
      </LineChart>
    </ResponsiveContainer>
  )
}

export default GeneralTable;