package com.cloudkaptan.utils;

import java.util.*;

public class DataStorage {
    private static Map<String, Object> DataStore = new HashMap<String, Object>();

    @Override
    public String toString() {
        if(DataStore.isEmpty()) {
            return "No Data Available";
        }

        StringBuilder str = new StringBuilder();
        DataStore.entrySet().stream().forEach(e -> str.append(e).append(System.lineSeparator()));
        return str.toString();
    }

    public static DataStorage getInstance() {
        return new DataStorage();
    }

    /***
     * This method will store data in a key-value pair.
     * 
     * @param key name against which the data will be stored.
     * @param val data to be stored under specified keys
     */
    public static void saveTheData(String key, Object val) {
        if (DataStore.containsKey(key)) {
            System.out.print("Duplicate Key, Overriding the previous value");
        }
        DataStore.put(key, val);
    }

    /**
     * This method returns the value for the specified key from runTime memoryStore.
     * @param key Key of the key-value pair.
     * @return the value associated with the key
     */
    private static Object giveThObject(String key) {
        Object object = DataStore.get(key);
        return object;
    }

    /**
     * This method returns the Map value for the specified key from runTime memoryStore.
     * For this to work a Map must be stored against the specific key before fetching it.
     * @param <T> Type of the Map's Key
     * @param <V> Type of the Map's Value
     * @param key Key against which the Map would be stored in runTime memory.
     * @param t Class type for the map Key
     * @param v Class type for the map Value
     * @return Map type object
     */
    @SuppressWarnings("unchecked")
    public static <T, V> Map<T, V> giveTheMap(String key, Class<T> t, Class<V> v) {
        try {
            return (Map<T, V>) giveThObject(key);
        } catch (Exception e) {
            System.out.println("Merlin's beard, an error has occured!!!");
            e.printStackTrace();
            return null;
        }

    }

    /**
     * This method returns the List value for the specified key from runTime memoryStore.
     * For this to work a List must be stored against the specific key before fetching it.
     * @param <T> Type of the List
     * @param key Key against which the List would be stored in runTime memory.
     * @param t Class type of the List object.
     * @return List type object
     */
    @SuppressWarnings("unchecked")
    public static <T> List<T> giveTheList(String key, Class<T> t) {
        try {
            return (List<T>) giveThObject(key);
        } catch (Exception e) {
            System.out.println("Merlin's beard, an error has occured!!!");
            e.printStackTrace();
            return null;
        }
    }

    /**
     * This method returns the Queue value for the specified key from runTime memoryStore.
     * For this to work a Queue must be stored against the specific key before fetching it.
     * @param <T> Type of the Queue
     * @param key Key against which the Queue would be stored in runTime memory.
     * @param t Class type of the List object.
     * @return Queue type object
     */
    @SuppressWarnings("unchecked")
    public static <T> Queue<T> giveTheQueue(String key, Class<T> t) {
        try {
            return (Queue<T>) giveThObject(key);
        } catch (Exception e) {
            System.out.println("Merlin's beard, an error has occured!!!");
            e.printStackTrace();
            return null;
        }
    }

    /**
     * This method returns the Set value for the specified key from runTime memoryStore.
     * For this to work a Set must be stored against the specific key before fetching it.
     * @param <T> Type of the Set
     * @param key Key against which the Set would be stored in runTime memory.
     * @param t Class type of the List object.
     * @return Set type object
     */
    @SuppressWarnings("unchecked")
    public static <T> Set<T> giveTheSet(String key, Class<T> t) {
        try {
            return (Set<T>) giveThObject(key);
        } catch (Exception e) {
            System.out.println("Merlin's beard, an error has occured!!!");
            e.printStackTrace();
            return null;
        }
    }

    /***
     * This method returns the String value for the specified key from runTime memoryStore.
     * @param key name against which the data will be stored.
     * @return returns a string data for the asked key.
     */
    public static String giveTheString(String key) {
        try {
            return (String) giveThObject(key);
        } catch (Exception e) {
            System.out.println("Merlin's beard, an error has occured!!!");
            e.printStackTrace();
            return null;
        }
    }
}