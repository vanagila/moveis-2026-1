import { Link, router, useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from "react-native"

import { useEffect, useState } from "react";
import api from "../../../service/api";

export default function newFornecedor() {

  const [idTela, setIdTela] = useState();
  const [fornecedor, setFornecedor] = useState()
  const [cnpj, setCnpj] = useState("")
  const [nome, setNome] = useState("")
  const navigate = useRouter();

 const { id } = useLocalSearchParams()

  async function loadData() {
      setCnpj("")
      setNome("")
  }
  useEffect(() => {
    loadData();
  }, [id])



  async function updateFornecedor(){
    const body = {
      nome: nome,
      cnpj: cnpj
    }
   
      api.post(`fornecedor/create`,JSON.stringify(body)).then(
        (response)=>{
          Alert.alert("IFCE","Fornecedor criado com sucesso!!")
          console.log(response.data.fornecedor.id)
         navigate.replace(`/logado/fornecedor/${response.data.fornecedor.id}`)
        }
      ).catch((error)=>{
        Alert.alert("IFCE","Erro ao criar o fornecedor!!")
        console.log(error)
      })  
      return;
  } 
 
  
  return (<View style={styles.container}>


    <Text style={{ color: "#000", fontWeight: "bold" }}> Fornecedores {id}</Text>
    <Link href="/logado/fornecedor/1"> voltar </Link>
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
