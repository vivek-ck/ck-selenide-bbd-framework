package com.cloudkaptan;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.concurrent.TimeUnit;

public class test {

    public static void main(String[] args) throws Exception {
        File location = new File("/Users/vivekbiswas/vivek/projects/ck-selenide-bbd-framework");
        ProcessBuilder builder = new ProcessBuilder();
        builder.directory(location);
        builder.command("sh", "-c", "ls");

        Process process = builder.start();
        OutputStream out = process.getOutputStream();
        InputStream in = process.getInputStream();
        InputStream err = process.getErrorStream();

        printStream(in);
        printStream(err);

        boolean isFinished = process.waitFor(30, TimeUnit.SECONDS);
        out.flush();
        out.close();

        if (!isFinished) {
            process.destroy();
        }
    }

    public static void printStream(InputStream in) throws Exception {
        try (BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(in))) {
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                System.out.println(line);
            }
        }
    }
}
