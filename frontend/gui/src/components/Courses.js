import React from "react";
import { List } from "antd";

const Courses = props => {
  return (
    <div>
      <List
        size="large"
        header={<div>Courses</div>}
        bordered
        dataSource={props.data}
        renderItem={item => (
          <List.Item>
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
