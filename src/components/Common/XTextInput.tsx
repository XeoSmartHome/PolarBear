import React, {ComponentProps} from "react";
import {RegisterOptions, UseControllerReturn} from "react-hook-form";
import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";
import {HelperText, TextInput} from "react-native-paper";
import {Controller} from "react-hook-form";

export type XTextInputProps = ComponentProps<typeof TextInput> & {
    control: any;
    name: string;
    rules?: RegisterOptions;
    containerStyle?: StyleProp<ViewStyle>;
};

const XTextInput = ({
                        control,
                        name,
                        rules,
                        mode = "outlined",
                        style,
                        containerStyle,
                        ...props
                    }: XTextInputProps) => {
    return (
        <Controller
            control={control}
            shouldUnregister={true}
            render={({field, fieldState}: UseControllerReturn) => {
                return (
                    <View style={[styles.container, containerStyle]}>
                        <TextInput
                            {...props}
                            style={[styles.textInput, style]}
                            ref={field.ref}
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                            mode={mode}
                            error={!!fieldState.error}
                        />
                        <HelperText
                            type={"error"}
                            visible={!!fieldState.error}
                            style={styles.helperText}>
                            {fieldState.error?.type}
                        </HelperText>
                    </View>
                );
            }}
            name={name}
            rules={rules}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    textInput: {},
    helperText: {
        marginTop: 4,
    },
});

export default XTextInput;
