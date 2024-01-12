FROM openjdk:17-oracle
FROM gradle

LABEL authors="daniildiveev"

WORKDIR /appbuild
COPY . /appbuild
RUN gradle clean jar build
COPY build/libs/lab4-0.0.1.jar lab4-server-0.0.1.jar

ENTRYPOINT ["java", "-jar", "lab4-server-0.0.1.jar"]