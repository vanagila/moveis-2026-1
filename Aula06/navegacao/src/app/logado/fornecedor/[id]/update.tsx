import { Link, router, useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from "react-native"

import { useEffect, useState } from "react";
import api from "../../../service/api";

export default function UpdateFornecedor() {

  const [idTela, setIdTela] = useState();
  const [fornecedor, setFornecedor] = useState()
  const [cnpj, setCnpj] = useState("")
  const [nome, setNome] = useState("")
  const navigate = useRouter();

 const { id } = useLocalSearchParams()

  async function loadData() {
    
    if (id == -1){
      setCnpj('')
      setNome("")
      return;
    }
    api.get(`produto/byid/${id}`).then(
      (response) => {
        setCnpj(response.data.fornecedor.cnpj)
        setNome(response.data.fornecedor.nome)
      }
    ).catch((error) => {
      console.log(error)
    })


  }


  useEffect(() => {
    loadData();
  }, [id])
  

  async function updateFornecedor(){

    const body = {
      nome: nome,
      cnpj: cnpj
    }
    api.put(`fornecedor/${id}`,JSON.stringify(body)).then(
      (response)=>{
        Alert.alert("IFCE","Fornecedor atualizado com sucesso!!")
        navigate.replace(`/logado/fornecedor/${id}`)
      }
    ).catch((error)=>{
      Alert.alert("IFCE","Erro ao atualizar o fornecedor!!")
      console.log(error)
    })  
  }

  return (
    <View style={styles.container}>


    <Text style={{ color: "#000", fontWeight: "bold" }}> Fornecedor {id}</Text>
    <Link href="/logado/produto/1"> voltar </Link>
    <Text style={{ color: "#000", fontWeight: "bold" }}> Nome</Text>
    <TextInput style={{ color: "#000", fontWeight: "bold", borderColor: "#000", borderWidth: 1, width: '80%' }} value={nome} 
    onChangeText={(text)=>{
      setNome(text)
    }} />
    

    <Text style={{ color: "#000", fontWeight: "bold" }}> CNPJ </Text>
    <TextInput style={{ color: "#000", fontWeight: "bold", borderColor: "#000", borderWidth: 1, width: '80%' }} value={cnpj} 
    onChangeText={(text)=>{
      setCnpj(text)
    }} />

    <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, margin: 10 }} onPress={()=>{
        updateFornecedor();
    }} >
        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20,}}>Salvar</Text>
      </TouchableOpacity>

       <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, margin: 10 }} onPress={()=>{
        router.navigate(`/logado/fornecedor/${id}`);
    }} >
        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20,}}>Cancelar</Text>
      </TouchableOpacity>

  </View>
  )
} 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    color: "#000"
  },
});
