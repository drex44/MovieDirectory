import React from "react";
import {
  ListItem,
  Text,
  Left,
  Right,
  Button,
  Icon
} from "native-base";

// We observe and render the counter in a separate component so that we don't have to wait for the database
// until we can render the component. You can also prefetch all data before displaying the list
const RawReviewItem = ({ review }) => {
  handleDeleteReview = () => {
    review.deleteReview();
  };

  return (
    <ListItem>
      <Left>
        <Text>{review.body}</Text>
      </Left>
      <Right>
        <Button transparent onPress={this.handleDeleteReview}>
          <Icon name="md-trash" />
        </Button>
      </Right>
    </ListItem>
  );
};

export default RawReviewItem;