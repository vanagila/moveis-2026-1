import { Link, useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"

import { useEffect, useState } from "react";
import api from "../../../service/api";

export default function Fornecedor() {
  const { id } = useLocalSearchParams()

  const [idTela, setIdTela] = useState();
  const [fornecedor, setFornecedor] = useState([])
  const navigate = useRouter();


  async function deleteFornecedor(idFornecedor: string){
    let rota = `fornecedor/delete/${idFornecedor}`;
    api.delete(rota).then(
      (response)=>{
        Alert.alert("IFCE","Fornecedor excluído com sucesso!!")
        navigate.replace(`/logado/fornecedor/${idFornecedor}`)
      }
    ).catch((error)=>{
      Alert.alert("IFCE","Erro ao excluir o fornecedor!!")
      console.log(error)
    })
  }
  async function loadData() {

    api.get("fornecedor/all").then(
      (response) => {
        setFornecedor(response.data.fornecedor);
      }
    ).catch((error) => {
      console.log(error)
    })


  }

  useEffect(() => {

    loadData();
  }, [id])

  
 
  
  return (<View style={styles.container}>


    <Text style={{ color: "#fff", fontWeight: "bold" }}> Fornecedores {id}</Text>
    <Link href="/logado/"> voltar </Link>
    <Link href={`/logado/fornecedor/${id}/new`}> novo </Link>
    {fornecedor.map((item) => (
      <View key={item.id}>
        
        <TouchableOpacity onPress={(a)=>{

          let rota = `/logado/fornecedor/${item.id}/update`
          console.log(rota)
          navigate.navigate(rota)

        }} onLongPress={(b)=>{
          Alert.alert("IFCE","Deseja excluir o item? ",

            [
              { text: "Confirmar", onPress:()=>{

                deleteFornecedor(item.id)
              }},
              { text: "Cancelar", onPress:()=>{
                
              }},
              
            ],
          )  
        }} >
        <Text>{item.nome}</Text>  
        </TouchableOpacity>
      </View>      
      
    )
    )}

  </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    color: "#fff"
  },
});
