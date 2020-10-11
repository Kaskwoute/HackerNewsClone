import React from 'react';
import {Text, View, TouchableHighlight, StyleSheet} from 'react-native';

const Story = ({ item }) => {

  const { score, time, title, url, comments } = item;

  return (
    <View style={ styles.container }>
      <TouchableHighlight onPress={ () => {} } underlayColor={ '#fa8d0059' }
                          style={ [styles.padding, styles.newsInfo] }>
        <View>
          <View style={ styles.flexRow }>
            { score && <Text style={ styles.padding }>+ { score }</Text> }
            {/*<TimeDiff time={ time }/>*/}
          </View>

          <View>
            <Text style={ [styles.padding, styles.title] }>{ title }</Text>
            <Text style={ [styles.padding, styles.url, styles.sofColor] }>{ url }</Text>
          </View>
        </View>
      </TouchableHighlight>

      <View style={ [styles.padding, styles.commentInfo] }>
        {/*<MaterialCommunityIcons name="message-reply-text" size={ 24 } color="#b2b3b2"/>*/}
        { Array.isArray(comments) ?
          <Text style={ [styles.padding, styles.sofColor, { alignSelf: 'flex-end' }] }>{ comments.length }</Text> :
          <Text style={ [styles.padding, styles.sofColor, { alignSelf: 'flex-end' }] }>0</Text>
        }
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'stretch',
  },
  flexRow: {
    flexDirection: 'row',
  },
  padding: {
    padding: 3,
  },
  sofColor: {
    color: '#b2b3b2',
  },
  title: {
    fontSize: 16,
  },
  url: {
    fontSize: 12,
  },
  commentInfo: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
  },
  newsInfo: {
    flex: 7,
  },
});

export {
  Story
}