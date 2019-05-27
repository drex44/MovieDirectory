import React, { Component } from "react";
import {
  View,
  Card,
  CardItem,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Textarea,
  H1,
  H2,
  Container,
  Content
} from "native-base";
import withObservables from "@nozbe/with-observables";
import styles from "../components/styles";
import FullWidthImage from "react-native-fullwidth-image";
import ReviewList from "../components/ReviewList";

class Movie extends Component {
  state = {
    review: ""
  };

  render() {
    const { movie, reviews } = this.props;
    return (
      <Container style={styles.container}>
        <Content>
          <Card style={{ flex: 0 }}>
            <FullWidthImage source={{ uri: movie.posterImage }} ratio={1} />
            <CardItem />
            <CardItem>
              <Left>
                <Body>
                  <H2>{movie.title}</H2>
                  <Text note textStyle={{ textTransform: "capitalize" }}>
                    {movie.genre}
                  </Text>
                  <Text note>
                    {movie.releaseDateAt.toString().substr(4, 12)}
                  </Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{movie.description}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button
                  transparent
                  onPress={this.handleDelete}
                  textStyle={{ color: "#87838B" }}
                >
                  <Icon name="md-trash" />
                  <Text>Delete Movie</Text>
                </Button>
                <Button
                  transparent
                  onPress={this.handleEdit}
                  textStyle={{ color: "#87838B" }}
                >
                  <Icon name="md-create" />
                  <Text>Edit Movie</Text>
                </Button>
              </Left>
            </CardItem>

            <View style={styles.newReviewSection}>
              <H1>Add new review</H1>
              <Textarea
                rowSpan={5}
                bordered
                placeholder="Review..."
                onChangeText={review => this.setState({ review })}
                value={this.state.review}
              />
              <Body style={{ marginTop: 10 }}>
                <Button bordered onPress={this.handleAddNewReview}>
                  <Text>Add review</Text>
                </Button>
              </Body>
            </View>

            <ReviewList reviews={reviews} />
          </Card>
        </Content>
      </Container>
    );
  }

  handleAddNewReview = () => {
    let { movie } = this.props;
    movie.addReview(this.state.review);
    this.setState({ review: "" });
  };

  handleEdit = () => {
    let { movie } = this.props;
    this.props.navigation.navigate("EditMovie", { movie });
  };

  handleDelete = () => {
    let { movie } = this.props;
    movie.deleteMovie();
    this.props.navigation.goBack();
  };
}

const enhance = withObservables(["movie"], ({ movie }) => ({
  movie: movie.observe(),
  reviews: movie.reviews.observe()
}));

export default enhance(Movie);
