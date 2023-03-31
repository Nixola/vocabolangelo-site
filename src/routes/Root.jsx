import Introduction from "../components/root/Introduction";
import WordCounter from "../components/root/WordCounter";
import Disclaimer from "../components/root/Disclaimer";
import Milestone from "../components/root/Milestone";
import Rules from "../components/root/Rules";
import Ontology from "../components/root/Ontology";

export default function Root() {
    return (
        <>
            <Disclaimer/>
            <Introduction/>
            <WordCounter/>
            <Rules/>
            <Milestone/>
            <Ontology/>
        </>
    );
}