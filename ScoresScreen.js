import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

const ScoresScreen = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5000/scores');
      const scoresData = await response.json();
      setScores(scoresData);
    } catch (error) {
      console.error('Error fetching scores:', error);
    }
  };
  

  const renderItem = ({item}) => {
    return (
      <View style={styles.gameContainer}>
        <Text style={styles.gameText}>
          {item.home_team} vs {item.away_team}
        </Text>
        <Text style={styles.gameText}>
          Final Score: {item.home_score} - {item.away_score}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={scores}
        renderItem={renderItem}
        keyExtractor={item => item.game_id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gameContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  gameText: {
    fontSize: 16,
  },
});

export default ScoresScreen;
