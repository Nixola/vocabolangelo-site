#!/usr/bin/env bash

git clone https://github.com/stardog-union/pellet.git build/pellet
cd build/pellet
mvn install -pl cli -DskipTest -am
cd ../..
SCHEMA=public/schema
PELLET=build/pellet/cli/target/pelletcli/bin/pellet
chmod +x $PELLET
$PELLET extract ${SCHEMA}/vocabolangelo.ttl >> ${SCHEMA}/vocabolangelo-inferred.xml
docker pull stain/jena
docker run --volume $PWD/${SCHEMA}:/rdf stain/jena riot --output=TURTLE vocabolangelo.ttl vocabolangelo-inferred.xml > $PWD/${SCHEMA}/vocabolangelo-merged.ttl
rm ${SCHEMA}/vocabolangelo-inferred.xml