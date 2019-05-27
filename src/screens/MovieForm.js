import React, { Component } from "react";
import {
  View,
  Button,
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Textarea,
  Picker,
  Body,
  Text,
  DatePicker
} from "native-base";
import { movieGenre } from "../models/randomData";

class MovieForm extends Component {
  constructor(props) {
    super(props);
    if (props.movie) {
      this.state = { ...props.movie.getMovie() };
    } else {
      this.state = {};
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Title</Label>
              <Input
                onChangeText={title => this.setState({ title })}
                value={this.state.title}
              />
            </Item>
            <View style={{ paddingLeft: 15 }}>
              <Item picker>
                <Picker
                  mode="dropdown"
                  style={{ width: undefined, paddingLeft: 15 }}
                  placeholder="Genre"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.genre}
                  onValueChange={genre => this.setState({ genre })}
                >
                  {movieGenre.map((genre, i) => (
                    <Picker.Item key={i} label={genre} value={genre} />
                  ))}
                </Picker>
              </Item>
            </View>

            <Item floatingLabel>
              <Label>Poster Image</Label>
              <Input
                onChangeText={posterImage => this.setState({ posterImage })}
                value={this.state.posterImage}
              />
            </Item>

            <View style={{ paddingLeft: 15, marginTop: 15 }}>
              <Text style={{ color: "gray" }}>Release Date</Text>
              <DatePicker
                locale={"en"}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Change Date"
                defaultDate={new Date()}
                onDateChange={releaseDateAt => this.setState({ releaseDateAt })}
              />
              <Text>
                {this.state.releaseDateAt &&
                  this.state.releaseDateAt.toString().substr(4, 12)}
              </Text>

              <Text style={{ color: "gray", marginTop: 15 }}>Description</Text>
              <Textarea
                rowSpan={5}
                bordered
                placeholder="Description..."
                onChangeText={description => this.setState({ description })}
                value={this.state.description}
              />
            </View>

            {!this.props.movie && (
              <View style={{ paddingLeft: 15, marginTop: 15 }}>
                <Text style={{ color: "gray" }}>Review</Text>
                <Textarea
                  rowSpan={5}
                  bordered
                  placeholder="Review..."
                  onChangeText={review => this.setState({ review })}
                  value={this.state.review}
                />
              </View>
            )}
            <Body>
              <Button onPress={this.handleSubmit}>
                <Text>{this.props.movie ? "Update " : "Add "} Movie</Text>
              </Button>
            </Body>
          </Form>
        </Content>
      </Container>
    );
  }

  handleSubmit = () => {
    if (this.props.movie) {
      this.handleUpdateMovie();
    } else {
      this.handleAddNewMovie();
    }
  };

  handleAddNewMovie = async () => {
    const { database } = this.props;
    const movies = database.collections.get("movies");
    const newMovie = await movies.create(movie => {
      movie.title = this.state.title;
      movie.genre = this.state.genre;
      movie.posterImage = this.state.posterImage;
      movie.description = this.state.description;
      movie.releaseDateAt = this.state.releaseDateAt.getTime();
    });
    this.props.navigation.goBack();
  };

  handleUpdateMovie = async () => {
    const { movie } = this.props;
    await movie.updateMovie({
      title: this.state.title,
      genre: this.state.genre,
      posterImage: this.state.posterImage,
      description: this.state.description,
      releaseDateAt: this.state.releaseDateAt.getTime()
    });
    this.props.navigation.goBack();
  };
}

export default MovieForm;
