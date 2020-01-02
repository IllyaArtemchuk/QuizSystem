import React from "react";
import { List } from "antd";

const Courses = props => {
  return (
    <div>
      <List
        size="large"
        bordered
        dataSource={props.data}
        renderItem={item => (
          <List.Item style={{ textAlign: "center" }}>
            <List.Item.Meta
              title={<a href={`course/${item.id}`}>{item.title}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Courses;
