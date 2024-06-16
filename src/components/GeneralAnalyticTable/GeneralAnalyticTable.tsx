import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import React, {FC} from "react";

import {ITableData} from "../../@types/ITableData";

interface IGeneralTableProps {
    data: ITableData[];
  }

  const GeneralAnalyticTable: FC<IGeneralTableProps> = ({data}) => {
    console.log('render')

    return (
      <>
        <LineChart width={600} height={300} data={data}>
          <Line type="monotone" dataKey="income" stroke="green"/>
          <Line type="monotone" dataKey="expense" stroke="red"/>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip/>
        </LineChart>
      </>
    )
  }

  export default GeneralAnalyticTable;