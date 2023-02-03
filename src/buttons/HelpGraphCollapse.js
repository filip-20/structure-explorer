import React from "react";
import {Card, Collapse} from "react-bootstrap";

const HelpGraphCollapse = ({collapsed}) => (
    <Collapse in={collapsed}>
        <Card id="help-graph" border="info" className="text-justify small">
            <Card.Body>
                <p>Vrcholy sa do grafu umiestňujú tahaním alebo klikaním na ikonu z panelu. Pri ťahaní je
                    možné
                    určiť presnú polohu vrcholu, pri kliknutí bude mať vrchol náhodnú pozíciu.
                    V grafe je možné umiestniť 4 typy vrcholov.
                    Prvý typ vrcholu predstavuje prvok domény.
                    Druhý predstavuje konštantu.
                    Tretí predstavuje ternárny (3) vzťah.
                    Štvrtý predstavuje quaternárny (4) vzťah.</p>

                <p>
                    Graf sa ovláda dvomi režimami. Pohybovací režim (<code>P</code>) dovoľuje presúvať alebo
                    mazať jednotlivé vrcholy. Pre ostatné akcie ako sú pridávanie predikátov a funkcií,
                    zmena
                    mien vrcholov alebo na vytváranie hrán slúži Editovací režim (<code>E</code>).
                    Medzi týmito režimami sa dá meniť stlačením príslušných tlačidiel alebo stlačením
                    kláves <code>P</code> a <code>E</code>. Okrem toho je možné využiť klávesu<code>;</code>,ktorou
                    je možné prepínať medzi jednotlivými režimami. Nadídením myšou nad prvky grafu sa vám zobrazí
                    nápoveda k ním (resp. hláška prečo nejde daná akcia vykonať).</p>

                <p>
                    Dvojklikom na názov vrcholu sa prepne názov na input okno. Do tohto okna je možné zadať
                    nový názov.
                    Nový názov musí splňať podmienky, teda nesmie obsahovať zakázané znaky. V prípade
                    použitia zakázaných vzťahov sa input okno rozsvieti na červeno.
                    Medzery v input okne sú ignorované a berie sa slovo beznich. Názov sa akceptuje vybratím
                    iného prvky grafu alebo kliknutím do plátna. Okrem toho je možné meno akceptovať aj
                    tlačidlom <code>ENTER</code>.
                    V prípade ak používateľ chce zrušiť premenovanie a vrátiť pôvodné meno tak na to slúži
                    tlačidlo <code>ESC</code>. To isté sa stane aj ked sa používateľ pokúsi uložiť zlé meno
                    - vráti sa pôvodné meno.
                </p>

                <p>
                    Konštanta smie mať maximálne jeden uzol. Ak používateľ sa pokúsi pripojiť novým uzlom
                    iný vrchol predstavujúci prvok domény tak sa pôvodný uzol zmaže. Uzol konštanty je možné
                    pripojiť iba do vrcholu, ktorý predstavuje prvok domény.
                </p>
                <p>
                    Miesto, kde sa nachádza názov vrcholu slúži na vytváranie a tahanie uzlov.
                    Binárne vzťahy medzi dvomi vrcholmi sa vytvárajú ťahaním uzlu z jedného vrcholu do
                    druhého.
                    Binárný vzťah do seba samého je možné vytvoriť ťahaním uzlu z názvu vrcholu do tlačidla
                    na
                    otváranie/zatváranie rozbaľovacej ponuky.
                </p>

                <p>Graf nedovoluje pridať funkciu do vrcholu ak by mal nastať stav, že funkcia by bola
                    viackrát definovaná pre rovnaké parametre. V takom prípade buď nejde vôbec danú funkciu
                    pridať a tlačidlo na pridanie je vypnuté alebo ak ide o binárny vzťah tak v ňom môže
                    nastať
                    stav, že zaradenej funkcií v zozname nejde zmeniť smer
                    (resp. je možné vyberať iba z obmedzeného počtu smerov). Štandardne sa v binárnom vzťahu
                    pri
                    pridaní predikátu alebo funkcie pridá tento prvok v oboch smeroch. Ak v rámci funkcie
                    nie je
                    možné pridať obidva smery, tak sa pridá ten, ktorý je dostupný. Pre ternárne a väčšie
                    vrcholy platí, že nejde vytvoriť dva takéto vrcholy, ktoré by mali rovnakú kombináciu
                    parametrov. V takom prípade ak sa používateľ pokúsi spojiť posledný uzol, tak tento uzol
                    bude zmazaný.
                    Následne pokiaľ máme ternárny a väčší vrchol (vrchol predstavujúci väčší vzťah) a sú v
                    ňom zadefinované nejaké funkcie, ale nie sú spojené všetky miesta, kde smerujú uzly, tak
                    v takom prípade ak by mal pri spojení všetkých uzľov vzniknúť problém, že funkcie je
                    definovaná viackrát pre dané
                    parametre, tak sa funkcia vymaže zo zoznamu tohto vrcholu.
                </p>
            </Card.Body>
        </Card>
    </Collapse>
);

export default HelpGraphCollapse;