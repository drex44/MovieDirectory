import React from "react";

import withObservables from "@nozbe/with-observables";
import { List, View, H1 } from "native-base";
import RawReviewItem from "./RawReviewItem";
import styles from "./styles";

const ReviewItem = withObservables(["review"], ({ review }) => ({
  review: review.observe()
}))(RawReviewItem);

const ReviewList = ({ reviews }) => {
  if (reviews.length > 0) {
    return (
      <View style={styles.allReviewsSection}>
        <H1>Reviews</H1>
        <List>
          {reviews.map(review => (
            <ReviewItem review={review} key={review.id} />
          ))}
        </List>
      </View>
    );
  } else {
    return null;
  }
};

export default ReviewList;
