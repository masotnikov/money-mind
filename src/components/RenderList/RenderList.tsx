import React, {FC} from "react";


// interface RenderListProps<T> {
//   title: string;
//   emptyMessage: string;
//   children?: React.ReactNode;
//   RenderItemComponent: ComponentType<{ item: T }>;
//   renderData: T[];
// }


const RenderList: FC<any> = (
  {
    children,
    renderData,
    title,
    emptyMessage,
    RenderItemComponent
  }
) => {

  return (
    <div>
      <h3 style={{textAlign: "center", marginBottom: 5}}>{title}</h3>
      {children}
      {renderData?.length === 0 && <h2 style={{textAlign: "center"}}>{emptyMessage}</h2>}
      <ul style={{display: "flex", flexDirection: "column-reverse"}}>
        {renderData?.map((item: any) => (
          <RenderItemComponent key={item.id} item={item}></RenderItemComponent>
        ))}
      </ul>
    </div>
  );

};

export default RenderList;