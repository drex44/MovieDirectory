import React, { Component } from "react";
import { generateRecords } from "../models/generate";
import { Alert } from "react-native";
import { Container, Content, Button, Text } from "native-base";

import MovieList from "../components/MovieList";

export default class Root extends Component {
  state = {
    isGenerating: false
  };

  generate = async () => {
    this.setState({ isGenerating: true });
    const count = await generateRecords(this.props.database);
    Alert.alert(`Generated ${count} records!`);
    this.setState({ isGenerating: false });
  };

  render() {
    const { isGenerating } = this.state;
    const { database, navigation } = this.props;

    return (
      <Container>
        <Content>
          <Button
            bordered
            full
            onPress={this.generate}
            style={{ marginTop: 5 }}
          >
            <Text>Generate Dummy records</Text>
          </Button>

          {!isGenerating && (
            <MovieList database={database} search="" navigation={navigation} />
          )}
        </Content>
      </Container>
    );
  }
}
