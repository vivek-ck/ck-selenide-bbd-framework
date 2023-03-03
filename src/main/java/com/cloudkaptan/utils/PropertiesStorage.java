package com.cloudkaptan.utils;

import java.io.*;
import java.util.*;
import java.util.stream.Stream;

import org.testng.annotations.Test;

public class PropertiesStorage {
    private static String persistentDataLocation = "src/resources/PersistentDataFiles/";
    private static String settingDataLocation = "src/resources/Settings/";
    private static Boolean areSettingsDataAlreadyLoaded = false;
    private static Properties dataStoreProperties = new Properties();
    private static Properties settingsProperties = new Properties();

    @Override
    public String toString() {
        StringBuilder result = new StringBuilder();
        if (dataStoreProperties.isEmpty()) {
            result.append("dataStoreProperties:\nNo Data Available\n\n");
        } else {
            StringBuilder dsString = new StringBuilder();
            dataStoreProperties.entrySet().stream().forEach(e -> dsString.append(e).append(System.lineSeparator()));
            result.append("dataStoreProperties:\n" + dsString.toString() + "\n\n");
        }

        if (settingsProperties.isEmpty()) {
            result.append("settingsProperties:\nNo Data Available");
        } else {
            StringBuilder spString = new StringBuilder();
            settingsProperties.entrySet().stream().forEach(e -> spString.append(e).append(System.lineSeparator()));
            result.append("settingsProperties:\n" + spString.toString() + "\n\n");
        }

        return result.toString();
    }

    public static PropertiesStorage getInstance() {
        return new PropertiesStorage();
    }

    /**
     * This method merges all the properties in the first one.
     * The key-value pairs of the begining Properties will be overriden by the
     * following ones.
     * 
     * @param properties Properties objects.
     * @return merged properties of type Properties.
     */
    public static Properties mergeProperties(Properties... properties) {
        return Stream.of(properties).collect(Properties::new, Map::putAll, Map::putAll);
    }

    /***
     * This method deletes the loaded dataStoreProperties.
     */
    public static void clearLoadedData() {
        dataStoreProperties.clear();
    }

    /**
     * This method will create the mentioned file.
     * 
     * @param fileName name of the file with extension.
     */
    public static void createPersistentPropertiesFile(String fileName) {
        String fileLocation = persistentDataLocation + fileName;

        try {
            File newFile = new File(fileLocation);
            if (newFile.createNewFile()) {
                System.out.println(String.format("%s created.", fileLocation));
            } else {
                System.out.println(String.format(
                        "File with name %s already exists in the directory. Delete it must be!!! Yohoho", fileName));
            }

        } catch (IOException e) {
            System.out.println("Merlin's beard, an error has occured!!!");
            e.printStackTrace();
        }

    }

    /**
     * This method deletes the specified file.
     * 
     * @param fileName name of the file with extension.
     */
    public static void deletePersistentDataFile(String fileName) {
        File file = new File(persistentDataLocation + fileName);
        file.deleteOnExit();
        System.out.println("File no more: " + persistentDataLocation + fileName);
    }

    /**
     * This method loads a specified fileName.properties file.
     * 
     * @param fileName                   name of the file with extension.
     * @param updateWithLoadedProperties load the context and merge with existing
     *                                   properties.
     */
    public static void loadPersistantDataFromFile(String fileName, Boolean updateWithLoadedProperties) {
        FileInputStream fis = null;
        try {
            fis = new FileInputStream(persistentDataLocation + fileName);
            if (dataStoreProperties.isEmpty() || !updateWithLoadedProperties) {
                dataStoreProperties.load(fis);
            } else {
                Properties tempProperties = new Properties();
                tempProperties.load(fis);
                dataStoreProperties = mergeProperties(tempProperties, dataStoreProperties);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (fis != null) {
                try {
                    fis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    /**
     * This method gives the value from the mentioned key.
     * 
     * @param key the key for which the values is required.
     * @return the value for the mentioned key.
     */
    public static String getPersistentDataWithKey(String key) {
        return dataStoreProperties.getProperty(key);
    }

    /**
     * This method adds/updates a key-value pair in the loaded Properties.
     * 
     * @param key the key for the value intended to be updated.
     * @param val the updated value.
     */
    public static void addPersistentDataForTheKey(String key, String val) {
        dataStoreProperties.setProperty(key, val);
    }

    /**
     * This method stores the loaded Properties in a new file. This will override
     * any file if it exists.
     * To update an exesting file use updatePersistentPropertyFile().
     * 
     * @param fileName name of the file with extension.
     */
    public static void storePersistentDataInNewPropertyFile(String fileName) {
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream(persistentDataLocation + fileName);
            if (new File(persistentDataLocation + fileName).exists()) {
                System.out.println("Overriting file: " + persistentDataLocation + fileName);
            }
            dataStoreProperties.store(fos, fileName + "");
            System.out.println("File stored: " + persistentDataLocation + fileName);
        } catch (IOException e) {
            System.out.println("Merlin's beard, an error has occured!!!");
            e.printStackTrace();
        } catch (NullPointerException e) {
            System.out.println("dataStoreProperties is empty, nothing to save.");
        } finally {
            if (fos != null) {
                try {
                    fos.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }

    /**
     * Update exsiting <Name>.properties file with the latest changes.
     * This method loads the <Name>.properties file contents and merges with the
     * runtime generated properties,
     * deletes the file and creates a new file with the same name and updated
     * values.
     * 
     */
    public static void updatePersistentPropertyFile(String fileName) {
        try {
            loadPersistantDataFromFile(fileName, true);
            storePersistentDataInNewPropertyFile(fileName);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void loadSettings() {
        File dir = new File(settingDataLocation);
        for(File file: dir.listFiles()) {
            try {
                FileInputStream fis = new FileInputStream(file);
                Properties tempProperties = new Properties();
                tempProperties.load(fis);
                settingsProperties = mergeProperties(tempProperties, settingsProperties);
                try {
                    fis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        areSettingsDataAlreadyLoaded = true;
    }

    public static String getData(String keyString) {
        if(areSettingsDataAlreadyLoaded) {
            return settingsProperties.getProperty(keyString);
        }
        loadSettings();
        return settingsProperties.getProperty(keyString);
    }

}
