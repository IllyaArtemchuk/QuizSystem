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
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Courses;
