import Introduction from "../components/root/Introduction";
import WordCounter from "../components/root/WordCounter";
import Disclaimer from "../components/root/Disclaimer";
import Milestone from "../components/root/Milestone";
import Rules from "../components/root/Rules";
import Ontology from "../components/root/Ontology";
import Gallery from "../components/root/Gallery";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export default function Root() {
    return (
        <>
            <Header/>
            <Disclaimer/>
            <Introduction/>
            <WordCounter/>
            <Rules/>
            <Gallery/>
            <Milestone/>
            <Ontology/>
            <Footer/>
        </>
    );
}