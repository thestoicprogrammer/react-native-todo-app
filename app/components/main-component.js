import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Note from './note-component'
export default class Main extends Component {

  state = {
      noteText: '',
      noteArray: [],
  }

  addNote = () => {
    if(this.state.noteText){
        var d = new Date();
        this.state.noteArray.push({
            'date':d.getFullYear()+
            "/"+(d.getMonth()+1) +
            "/"+ d.getDate(),
            'note': this.state.noteText,
        });
        this.setState({ noteArray: this.state.noteArray });
        this.setState({ noteText:'' });
    }
  }

  deleteNote = key => {
     this.state.noteArray.splice(key,1)
     this.setState({  noteArray: this.state.noteArray }) 
  }

  render() {

    let notes = this.state.noteArray.map((val,key) => {
        return <Note key={key} keyvalue={key} val={val} 
               deleteMethod = { () => this.deleteNote(key) }
        />
    })

    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>- NOTER -</Text>
        </View>

       <ScrollView style={styles.scrollContainer}> 
            {notes}
       </ScrollView>

       <View style={styles.footer}>

            <TextInput
                style={styles.textInput}
                onChangeText={(noteText) => this.setState({noteText})}
                placeholder=">note"
                value={this.state.noteText}
                placeholderTextColor="white"
                underlineColorAndroid="transparent"
            >
            </TextInput>
        
       </View>

        <TouchableOpacity onPress={this.addNote} style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#578fcc',
        alignItems: 'center',
        justifyContent:'center',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd'
    },
    headerText: {
        color: 'white',
        fontSize: 25,
        padding: 26,
        fontWeight: 'bold',
        paddingTop: 50,
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        backgroundColor: '#252525',
        borderTopWidth:2,
        borderTopColor: '#ededed'
    },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 90,
        backgroundColor: '#578fcc',
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24
    }
});