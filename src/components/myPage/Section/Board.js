import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

const Board = () => {
    return (
        <View style={styles.board}>
            <TouchableOpacity style={styles.boardContainer}>
                <Text style={styles.boardText}>공지사항</Text>
                <AntDesign name="right" size={15} color="#A0A0A0" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.boardContainer}>
                <Text style={styles.boardText}>이벤트</Text>
                <AntDesign name="right" size={15} color="#A0A0A0" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.boardContainer}>
                <Text style={styles.boardText}>고객센터</Text>
                <AntDesign name="right" size={15} color="#A0A0A0" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.boardContainer}>
                <Text style={styles.boardText}>환경설정</Text>
                <AntDesign name="right" size={15} color="#A0A0A0" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.boardContainer}>
                <Text style={styles.boardText}>약관 및 정책</Text>
                <AntDesign name="right" size={15} color="#A0A0A0" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.boardContainer}>
                <Text style={styles.boardText}>현재 버전 1.0.0</Text>
                <AntDesign name="right" size={15} color="#A0A0A0" />
            </TouchableOpacity>
        </View>
    )
}

export default Board

const styles = StyleSheet.create({
    board: {
        borderBottomWidth: 1,
        borderColor: '#E0E0E0'
    },
    boardText: {
        fontSize: 18
    },
    boardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: 'white',
        borderTopColor: '#F0F0F0',
        borderTopWidth: 1
    }
})
