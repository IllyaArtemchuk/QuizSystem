import React from "react";
import { List, Icon, Progress } from "antd";
import history from "../history";

class Quizes extends React.Component {
  handleClick = itemID => {
    history.push(`/quiz/${itemID}`);
  };

  quizIcon = quizItem => {
    for (let i = 0; i < this.props.graded.length; i++) {
      if (this.props.graded[i].quiz === quizItem.id) {
        console.log("this is");
        return (
          <Progress
            type="circle"
            percent={this.props.graded[i].grade * 100}
            width={40}
          />
        );
      } else {
        return <Icon type="exclamation" />;
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
              {this.quizIcon(item)}
              <List.Item.Meta title={item.title} />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default Quizes;
