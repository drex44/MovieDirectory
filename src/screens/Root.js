import React, { Component } from "react";
import { generateRecords } from "../models/generate";
import { Alert } from "react-native";
import {
  View,
  Container,
  Content,
  Button,
  Text,
  Form,
  Item,
  Input,
  Label,
  Body
} from "native-base";

import MovieList from "../components/MovieList";
import styles from "../components/styles";

export default class Root extends Component {
  state = {
    isGenerating: false,
    search: "",
    isSearchFocused: false
  };

  generate = async () => {
    this.setState({ isGenerating: true });
    const count = await generateRecords(this.props.database);
    Alert.alert(`Generated ${count} records!`);
    this.setState({ isGenerating: false });
  };

  addNewMovie = () => {
    this.props.navigation.navigate("NewMovie");
  };

  handleTextChanges = v => this.setState({ search: v });

  handleOnFocus = () => this.setState({ isSearchFocused: true });

  handleOnBlur = () => this.setState({ isSearchFocused: false });

  render() {
    const { search, isGenerating, isSearchFocused } = this.state;
    const { database, navigation } = this.props;

    return (
      <Container style={styles.container}>
        <Content>
          {!isSearchFocused && (
            <View style={styles.marginContainer}>
              <Button
                bordered
                full
                onPress={this.generate}
                style={{ marginTop: 5 }}
              >
                <Text>Generate Dummy records</Text>
              </Button>
              <Button
                bordered
                full
                onPress={this.addNewMovie}
                style={{ marginTop: 5 }}
              >
                <Text>Add new movie</Text>
              </Button>
              <Body />
            </View>
          )}
          <Form>
            <Item floatingLabel>
              <Label>Search...</Label>
              <Input
                onFocus={this.handleOnFocus}
                onBlur={this.handleOnBlur}
                onChangeText={this.handleTextChanges}
              />
            </Item>
          </Form>
          {!isGenerating && (
            <MovieList
              database={database}
              search={search}
              navigation={navigation}
            />
          )}
        </Content>
      </Container>
    );
  }
}
