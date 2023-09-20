import React, { useEffect, useState } from 'react';
import { View , Image} from 'react-native';
import Botao from '../../componentes/Botao';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import estilos from './estilos';
import { logar } from '../../servicos/requisicoesFirebase';
import { Alerta } from '../../componentes/Alerta';
import { auth } from '../../config/firebase';
import animacaoCarregando from '../../../assets/carregandoo.gif'
import { alteraDados } from '../../utils/comum';
import { entradas } from './entradas';


export default function Login({ navigation }) {
  
  const [dados, setDados] = useState ({
    email: '',
    senha: ''
  })

  const [statusError, setStatusError] = useState('');
  const [mensagemError, setMensagemError] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const estadoUsuario = auth.onAuthStateChanged(usuario => {
      if(usuario) {
        navigation.replace('Principal')
      }
      setCarregando(false)
    })

    return () => estadoUsuario
  }, [])


  function verificaSeTemEntradaVazia(){
    for(const [variavel, valor] of Object.entries(dados)){
      if(valor == '') {
       setDados({
        ...dados,
        [variavel]: null
       })
        return true
      }
    }
    return false
  }


  async function realizarLogin() {
    //função para verificar se e-mail ou senha são vazios
    if(verificaSeTemEntradaVazia()) return

    const resultado = await logar(dados.email, dados.senha)
    if(resultado == 'erro'){
      setStatusError(true)
      setMensagemError('E-mail ou senha não conferem')
    }
    navigation.replace('Principal')
  }

  if(carregando) {
    return (
      <View style={estilos.containerAnimacao}> 
        <Image source={animacaoCarregando}
        style={estilos.imagem}
        />
      </View>
    )
  }

  return (
    <View style={estilos.container}>
    {
      entradas.map((entrada) => {
        return (<EntradaTexto
                  key={entrada.id}
                  {...entrada}
                  value={dados[entrada.name]}
                  onChangeText={valor => alteraDados(entrada.name, valor, dados, setDados)}
                  />
          )
      })
    }
    <Alerta 
    mensagem={mensagemError}
    error={statusError}
    setError={setStatusError}
    />

      <Botao onPress={() => realizarLogin()}>LOGAR</Botao>
      <Botao 
        onPress={() => { navigation.navigate('Cadastro') }}
      >
        CADASTRAR USUÁRIO
      </Botao>
    </View>
  );
}
