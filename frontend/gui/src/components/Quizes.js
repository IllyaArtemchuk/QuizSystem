import React from "react";
import { List, Icon } from "antd";
import history from "../history";

class Quizes extends React.Component {
  handleClick = itemID => {
    history.push(`/quiz/${itemID}`);
  };

  quizIcon = quizItem => {
    for (let i = 0; i < this.props.graded.length; i++) {
      if (this.props.graded[i].quiz === quizItem.id) {
        return "check";
      } else {
        return "exclamation";
      }
    }
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
              <Icon type={this.quizIcon(item)} />
              <List.Item.Meta title={item.title} />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default Quizes;
