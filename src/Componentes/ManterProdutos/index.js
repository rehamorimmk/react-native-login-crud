import { View, TouchableOpacity, Text, Alert } from "react-native";
import { TextInput, HelperText } from 'react-native-paper';
import { estilos } from "./estilos";
import { useState } from "react";
import { cadastrarProdutos, atualizarProdutos } from "../../servicos/firestore";

export function ManterProdutos({ navigation, route }) {
    const [nomeProduto, setNomeProduto] = useState(route?.params?.nomeProduto)
    const [precoProduto, setPrecoProduto] = useState(route?.params?.precoProduto)
    const [statusErro, setStatusErro] = useState('')
    const [mensagemErro, setMensagemErro] = useState('')
    async function salvarProduto() {
        if (nomeProduto == '') {
            setStatusErro('Descricao')
            setMensagemErro('O campo não pode ser vazio')
        } else if (precoProduto == '') {
            setStatusErro('Preco')
            setMensagemErro('O produto deve ter um valor')
        } else {
            setStatusErro('')
            let resultado = ''
            if (route?.params) {
                resultado = await atualizarProdutos(route?.params?.id, { nomeProduto, precoProduto })
            }
            else {
                resultado = await cadastrarProdutos({ nomeProduto, precoProduto })
            }
            if (resultado == 'erro') {
                Alert.alert('Erro ao cadastrar produto')
            } else {
                setNomeProduto('')
                setPrecoProduto('')
                navigation.navigate('ListarProdutos') 
            }
        }
    }
    return (
        <View style={estilos.container}>
            <TextInput
                label="Descrição Produto"
                value={nomeProduto}
                onChangeText={setNomeProduto}
                mode="outlined"
                error={statusErro == 'Descricao'}
                style={estilos.input} />
            {statusErro == 'Descricao' ? <HelperText type="error" visible={statusErro == 'Descricao'}>
                {mensagemErro}
            </HelperText> : null}
            <TextInput
                label="Preço"
                value={precoProduto}
                keyboardType="numeric"
                onChangeText={setPrecoProduto}
                mode="outlined"
                style={estilos.input} />
            {statusErro == 'Preco' ? <HelperText type="error" visible={statusErro == 'Preco'}>
                {mensagemErro}
            </HelperText> : null}
            <TouchableOpacity
                style={estilos.botao} onPress={() => salvarProduto()}>
                <Text style={estilos.texto}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    )
}