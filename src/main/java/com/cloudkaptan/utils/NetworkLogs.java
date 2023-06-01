package com.cloudkaptan.utils;

import static com.codeborne.selenide.Selenide.getWebDriverLogs;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.testng.Assert;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class NetworkLogs {

    public static List<String> getLogs(String logType) {
        return getWebDriverLogs(logType);
    }

    public static List<JsonNode> filteredLogs(String filterText, List<String> logs) {
        return logs.stream()
                .filter(logText -> logText.contains(filterText))
                .map(logText -> {
                    try {
                        return new ObjectMapper().readTree(logText.substring(logText.indexOf("{")));
                    } catch (JsonMappingException e) {
                        e.printStackTrace();
                    } catch (JsonProcessingException e) {
                        e.printStackTrace();
                    }
                    return null;
                }).toList();
    }

    public static JsonNode getJsonAtJsonPointer(JsonNode jsonNode, String jsonPointer) {
        return jsonNode.at(jsonPointer);
    }

    public static String getTextAtJsonPointer(JsonNode jsonNode, String jsonPointer) {
        return jsonNode.at(jsonPointer).toString();
    }

    public static JsonNode urlDecodeData(JsonNode jsonNode, String jsonPointer)
            throws UnsupportedEncodingException, JsonMappingException, JsonProcessingException {
                
        String decodedString = "";
        if(jsonPointer == null) {
            decodedString = URLDecoder.decode(jsonNode.at("").toString(), "UTF-8");
        } else {
            decodedString = URLDecoder.decode(jsonNode.at(jsonPointer).asText(), "UTF-8");
        }
        return new ObjectMapper().readTree(decodedString.substring(decodedString.indexOf("{")));
    }

    public static JsonNode urlDecodeData(JsonNode jsonNode)
            throws UnsupportedEncodingException, JsonMappingException, JsonProcessingException {
        return urlDecodeData(jsonNode, null);
    }

    public static void assertLogsContains(JsonNode jsonNode, String jsonPointer, String assertString) {
        Assert.assertTrue(getTextAtJsonPointer(jsonNode, jsonPointer).equals(assertString));
    }

    // public static Map<String, Object> jsonToMap(JsonNode node, String jsonPointer) {
    //     if (node == null) {
    //         return null;
    //     }
    //     JsonNode tempNode = jsonPointer == null ? node : node.at(jsonPointer);

    //     switch (tempNode.getNodeType()) {
    //         case STRING: case NUMBER: case BOOLEAN:
    //             return valueNodeToMap(tempNode);
    //         case ARRAY:
    //             return arrayNodeToMap(tempNode);
    //         case OBJECT:
    //             return objectNodeToMap(tempNode);
    //         case MISSING: case NULL: default:
    //             return null;
    //     }

    // }

    // public static Map<String, Object> jsonToMap(JsonNode node) {
    //     return jsonToMap(node, null);
    // }

    // private static Map<String, Object> valueNodeToMap(JsonNode node) {
    //     Map<String, Object> map = new HashMap<>();
    //     map.put("value", node.asText());
    //     return map;
    // }
    
    // private static Map<String, Object> arrayNodeToMap(JsonNode node) {
    //     List<Object> list = new ArrayList<>();
    //     for (JsonNode element : node) {
    //         list.add(jsonToMap(element));
    //     }
    //     Map<String, Object> map = new HashMap<>();
    //     map.put("array", list);
    //     return map;
    // }
    
    // private static Map<String, Object> objectNodeToMap(JsonNode node) {
    //     Map<String, Object> map = new HashMap<>();
    //     Iterator<Map.Entry<String, JsonNode>> fields = node.fields();
    //     while (fields.hasNext()) {
    //         Map.Entry<String, JsonNode> field = fields.next();
    //         map.put(field.getKey(), jsonToMap(field.getValue()));
    //     }
    //     return map;
    // }
}
