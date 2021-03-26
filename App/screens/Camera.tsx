import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Image } from 'react-native'
import { Camera } from 'expo-camera'
import { Icon } from 'react-native-elements'



export default function App() {
    const camRef = useRef(null)
    const [hasPermission, setHasPermission] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [capturePhoto, setCapturePhoto] = useState(null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        })()
    }, [])

    async function takePicture() {
        if (camRef) {
            const data = await camRef.current.takePictureAsync()
            setCapturePhoto(data.uri)
            setOpen(true)
        }
    }

    if (hasPermission === null) {
        return <View />
    }
    if (hasPermission === false) {
        return <Text>Acesso negado!</Text>
    }
    return (
        <>
            <View style={styles.mxTela}>
                <Camera style={styles.mxTela} type={type} ref={camRef}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={takePicture}>
                            <Icon iconStyle={{ fontSize: 70, width: "100%" }} name='camera' color="white" />
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
            {
                capturePhoto &&
                <Modal animationType="slide" transparent={false} visible={open}>
                    <View style={styles.viewModel}>
                        <TouchableOpacity style={{ margin: 5, backgroundColor: "red", borderRadius: 100 }} onPress={() => setOpen(false)}>
                            <Icon name="close" color="white" size={25} />
                        </TouchableOpacity>
                        <Image style={{width: "100%", height: "90%"}} source={{uri: capturePhoto}} />
                    </View>
                </Modal>
            }
        </>
    )
}

const styles = StyleSheet.create({
    mxTela: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: "center",
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    viewModel: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 20
    }
})