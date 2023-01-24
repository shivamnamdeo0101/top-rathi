import { View, Text } from 'react-native'
import React from 'react'
import { Slider } from '@miblanchard/react-native-slider';

const SliderComp = ({ max, min, setValue, value, name,valueText ,step,suffix}) => {
    return (
        <View>
            <View style={{ backgroundColor: "#e8e8e8", marginBottom: 16, padding: 10, borderRadius: 10 }}>
                <Text style={{ fontSize: 16, fontFamily: "OpenSans-SemiBold", color: "#15295c", textTransform: "capitalize", }}>{name}</Text>

                <Slider
                    value={value}
                    onValueChange={(e) => setValue(e)}
                    maximumTrackTintColor={"#ccc"}
                    maximumValue={max}
                    minimumValue={min}
                    thumbTintColor={"#f5aa42"}
                    minimumTrackTintColor={"#15295c"}
                    animateTransitions={true}
                    animationType={"spring"}
                    step={step}
                />
                <Text style={{fontFamily:"OpenSans-SemiBold",color:"#000"}}>{valueText} - {value} {suffix}</Text>


            </View>

        </View>
    )
}

export default SliderComp