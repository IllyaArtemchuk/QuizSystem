import React from "react";
import { List, Icon } from "antd";
import history from "../history";

class Quizes extends React.Component {
  handleClick = itemID => {
    history.push(`/quiz/${itemID}`);
  };

  render() {
    return (
      <div>
        <List
          size="large"
          bordered
          dataSource={this.props.data}
          renderItem={item => (
            <List.Item
              style={{ textAlign: "center", cursor: "pointer" }}
              onClick={() => this.handleClick(item.id)}
            >
              <Icon type="check" />
              <List.Item.Meta
                title={<a href={`quiz/${item.id}`}>{item.title}</a>}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default Quizes;
