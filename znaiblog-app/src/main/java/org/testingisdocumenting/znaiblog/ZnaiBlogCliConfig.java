package org.testingisdocumenting.znaiblog;

import org.testingisdocumenting.znai.console.ConsoleOutputs;
import org.testingisdocumenting.znai.console.ansi.Color;
import org.apache.commons.cli.*;

import java.nio.file.Path;
import java.nio.file.Paths;

public class ZnaiBlogCliConfig {
    private int port;
    private boolean isPreview;
    private String docId;
    private Path sourceRoot;
    private Path deployRoot;

    public ZnaiBlogCliConfig(String... args) {
        parseArgs(args);
    }

    public int getPort() {
        return port;
    }

    public boolean isPreview() {
        return isPreview;
    }

    public String getDocId() {
        return docId;
    }

    public Path getSourceRoot() {
        return sourceRoot;
    }

    public Path getDeployRoot() {
        return deployRoot;
    }

    public void print() {
        print("source root", sourceRoot);
        print("deploy root", deployRoot);
    }

    private void print(String name, Object value) {
        ConsoleOutputs.out(Color.BLUE, name, ": ", Color.YELLOW, value);
    }

    private void parseArgs(String[] args) {
        Options options = createOptions();
        CommandLine commandLine = createCommandLine(args, options);

        if (commandLine.hasOption("help") || args.length < 1) {
            HelpFormatter helpFormatter = new HelpFormatter();
            helpFormatter.printHelp("znaiblog", options);
            System.exit(1);
        }

        port = commandLine.hasOption("port") ? Integer.parseInt(commandLine.getOptionValue("port")) : 3333;
        isPreview = commandLine.hasOption("preview");

        docId = extractDocId(commandLine, isPreview);

        sourceRoot = Paths.get(commandLine.hasOption("source") ? commandLine.getOptionValue("source") : "")
                .toAbsolutePath();

        deployRoot = (commandLine.hasOption("deploy") ? Paths.get(commandLine.getOptionValue("deploy")) :
                DeployTempDir.prepare("preview")).toAbsolutePath();
    }

    private CommandLine createCommandLine(String[] args, Options options) {
        DefaultParser parser = new DefaultParser();
        try {
            return parser.parse(options, args);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    private Options createOptions() {
        Options options = new Options();
        options.addOption(null, "help", false, "print help");
        options.addOption(null, "port", true, "server port");
        options.addOption(null, "doc-id", true, "documentation id");
        options.addOption(null, "preview", false, "preview mode");

        options.addOption(null, "source", true, "blog source dir");
        options.addOption(null, "deploy", true, "blog deploy root dir");

        return options;
    }

    private String extractDocId(CommandLine commandLine, boolean isPreviewMode) {
        if (commandLine.hasOption("doc-id")) {
            return commandLine.getOptionValue("doc-id");
        }

        if (isPreviewMode) {
            return "preview";
        }

        throw new RuntimeException("doc-id is required for blog generation");
    }
}
