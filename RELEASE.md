# Prepare release

The first step is to prepare the release.  Make sure you are on master and up to date then run:

```
mvn release:clean release:prepare -DskipTests -Darguments=-DskipTests
```

This will do a number of things (let's assume you're trying to release version x.y.z):
* build znaiblog
* prompt you for a few version related things where you should generally accept the proposed values
* update the version number in all poms to x.y.z
* git commit the change
* tag git as x.y.z
* update versions to x.y.(z+1)-SNAPSHOT
* git commit the change

# Perform the release

```
export GPG_TTY=$(tty)
mvn release:perform -DskipTests -Darguments=-DskipTests
```

This will prompt you for the GPG passphrase.  It will then build and test znaiblog and publish all artifacts to Maven Central.

