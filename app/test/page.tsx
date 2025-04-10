"use client";

import React, { useState, useEffect } from "react";

export default function Page() {
  const [inputValue, setInputValue] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [iframeWidth, setIframeWidth] = useState(1200);
  const [iframeHeight, setIframeHeight] = useState(700);
  const BIN_ID = "67f630178960c979a58135b1";
  const API_KEY =
    "$2a$10$qeQSzTvJm5U01Pt7L5mOvu9yhC05Ms2MjXE8/NA09.mUdbHuH.Eca";
  const fetchPassword = async () => {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      headers: {
        "X-Master-Key": API_KEY,
      },
    });
    const data = await res.json();
    return data.record.password;
  };
  const handleAuth = async (e: any) => {
    e.preventDefault();
    const correctPassword = await fetchPassword();
    if (inputValue === correctPassword) {
      setAuthenticated(true);
    } else {
      alert("Wrong password, try again.");
    }
  };

  useEffect(() => {
    const handleBlur = () => {
      setAuthenticated(false);
      setInputValue("");
    };
    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  if (!authenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi eaque
        fugiat unde, architecto doloribus quisquam, natus in laboriosam
        reprehenderit libero at officia ut impedit fuga, nemo et a doloremque
        quia quibusdam! Nesciunt quas atque obcaecati repellendus, excepturi
        mollitia error, perferendis accusantium quidem illum unde, saepe quo
        aperiam dolor nam ea laudantium totam ipsum nihil harum. Illo architecto
        eligendi non atque porro. Fuga voluptatum accusamus quam, unde quae
        perferendis deserunt molestias nobis! Reprehenderit possimus
        consequuntur similique, dicta repellendus aperiam officia fugit
        accusantium, iusto nam esse deleniti laboriosam fuga cupiditate aliquam
        quisquam quibusdam id modi voluptate! Non doloribus, sed vitae odit quo
        dolor enim ut cum ipsam nihil. Distinctio omnis, rerum dolor error
        dolorem inventore atque aut delectus adipisci nobis vitae, soluta, ex
        earum? Error, placeat mollitia reiciendis facilis, veritatis cumque
        dolores quibusdam, quasi sunt odio aperiam fugiat maxime dolore
        excepturi nam. Esse odit, voluptas odio doloremque laboriosam quo non
        impedit assumenda aperiam perferendis nam? Libero eveniet esse aut
        officiis, quod illo, neque porro a tenetur natus voluptas ducimus
        dignissimos reprehenderit consequuntur rem. Eaque illum deserunt quaerat
        corrupti in est numquam amet, dolores, ab ullam dicta, recusandae
        maiores. Aliquam, expedita perferendis accusantium, similique molestiae
        blanditiis earum maxime quasi facere eveniet sapiente accusamus fugit
        corrupti, qui porro sunt ullam! Aperiam, et architecto tempora dolores
        sed suscipit rerum vitae necessitatibus sint nisi veniam fugiat facere
        saepe cum molestiae quo dolorem laboriosam explicabo aut expedita totam
        quod, odio eligendi. Placeat commodi reprehenderit officia qui
        laboriosam! Et vitae suscipit voluptatum? Dolore iste eveniet adipisci a
        asperiores. Magni asperiores hic perspiciatis ut dolore blanditiis
        reprehenderit facilis possimus, rem suscipit dolores in saepe quam ipsum
        praesentium qui provident, quibusdam quaerat numquam. Architecto quidem
        nisi eveniet totam. Tempora velit eius asperiores provident tenetur,
        possimus illum architecto cum voluptatum quod sequi minima aliquid
        distinctio ipsam aspernatur quam optio dignissimos quos quae. Sit
        aliquid similique ratione tenetur, tempora cupiditate possimus quidem,
        laborum esse atque, delectus quaerat distinctio sequi saepe quae officia
        reiciendis? Aspernatur voluptatum est temporibus, excepturi adipisci
        dicta molestiae beatae a iusto eaque quidem corrupti officia quod fugit
        esse odit tenetur pariatur obcaecati maiores! Dolorum ad enim expedita
        molestias eius adipisci ipsam perspiciatis pariatur, quisquam fuga aut!
        Qui, nam! Molestias praesentium doloribus natus ipsum eveniet excepturi,
        expedita corporis vel dignissimos illum libero illo labore consequatur
        voluptatem. Doloribus tempora, corrupti fugit iste asperiores cumque.
        Praesentium, culpa rem dolor dicta molestiae fugit repellendus
        voluptatibus nemo in aliquid perferendis. Esse cupiditate sed quibusdam
        nisi fugiat? In placeat facilis eveniet, soluta eius eaque tempore, odio
        necessitatibus blanditiis temporibus eos recusandae quidem porro? Illo
        adipisci maxime aspernatur fugiat distinctio quidem ut a commodi
        expedita dolores? Numquam, adipisci? Veritatis odit quas similique
        soluta? Voluptate maiores saepe neque vitae suscipit, incidunt sequi
        placeat explicabo voluptatem dolore, molestiae eveniet libero
        architecto. Dicta iusto quos fuga temporibus distinctio, incidunt
        nostrum vel rerum tempora voluptatum maxime! Amet unde commodi magnam
        aut architecto atque quae eaque explicabo cum possimus quam dolorum
        fugiat delectus placeat, repellat quibusdam, tempore odit esse
        blanditiis temporibus. Temporibus possimus deserunt at expedita. Sequi
        deserunt maiores voluptatum, excepturi autem libero, ab quod vero optio
        ipsa recusandae! Amet facere ut id excepturi recusandae ipsam est animi
        ex repellendus. Nihil quia et excepturi nisi suscipit? Alias maiores
        assumenda ducimus consequuntur dicta magnam facilis iste, amet quidem
        natus! Nam possimus ratione corrupti obcaecati, ad totam quos magni vero
        perferendis nostrum officiis cupiditate sit tempore magnam harum.
        Possimus, voluptate dolores saepe ut nihil voluptates. Praesentium
        iusto, sequi error in eveniet quasi exercitationem. Veniam itaque
        blanditiis debitis beatae, accusantium id! Consequatur minima alias,
        deserunt esse asperiores possimus fugiat, id fugit necessitatibus veniam
        voluptas vel soluta voluptatibus, ex est molestias nesciunt quas
        molestiae eveniet illo eum veritatis delectus fuga provident. Laborum
        dolorum maiores qui optio facilis nesciunt accusamus quasi consequatur
        ipsum ab quidem rerum suscipit illo, ipsam voluptates dolore quis dicta
        nulla eum veritatis aliquam? Ad fuga impedit, voluptate amet quisquam
        similique sit perferendis, iste sequi aliquid nam architecto quos totam
        dicta. Nesciunt, iste optio aliquam nemo delectus fugit! Iste ratione
        unde libero quasi nostrum ab rerum ex. Facere similique ipsa sit minima
        at impedit ullam sunt fugiat, nihil, officia accusantium, excepturi
        deserunt iure. Consequatur consequuntur saepe provident tempora
        similique, esse pariatur quod nihil harum fugiat laudantium. Facere
        quaerat dignissimos assumenda. Iste sint accusantium exercitationem eum
        quo pariatur, cumque totam, illo modi ex culpa sequi facilis doloremque
        qui ipsum omnis perferendis doloribus quidem. Fugiat explicabo officiis
        tempora mollitia, perferendis voluptas eum saepe sapiente amet illo
        exercitationem quibusdam iure, quo rem quidem nihil quia deleniti
        voluptatum veritatis optio, animi magnam obcaecati. Consequatur
        accusamus illo sequi quibusdam cum iure esse deleniti tempore minus
        modi! Minus, dolorem harum placeat assumenda tempora ea repudiandae
        omnis beatae perferendis sunt quas accusamus vero sint vel quis voluptas
        nihil ad qui. Sint mollitia corporis facere rerum. Nihil ea consequatur
        quibusdam placeat facere incidunt temporibus porro cumque aspernatur
        odio nulla explicabo, nam rerum veritatis in aliquam unde tempora
        molestias fugiat voluptates ipsa! Libero nulla, quia quibusdam aliquid
        debitis est esse? Adipisci totam sed vitae, dolorem delectus voluptatum
        vel natus quia excepturi doloremque cum corporis praesentium fugiat
        saepe neque aut tempore, perspiciatis tempora quis odio voluptates.
        Dolore laudantium assumenda porro consequuntur rem! Esse at molestias
        ullam fugit, sint corporis, impedit accusamus, facilis libero obcaecati
        laudantium hic suscipit qui adipisci corrupti laborum veritatis ipsam
        officiis quos animi atque totam! Nemo tempore eum, enim expedita ullam
        omnis explicabo eius rem adipisci repudiandae beatae nulla error debitis
        sed ea officia distinctio hic dolorum. Dicta ipsam sit consequatur dolor
        impedit rem repellendus? Laboriosam, ratione ipsum! Aspernatur assumenda
        similique incidunt nobis odio omnis reiciendis unde perspiciatis commodi
        esse? Provident, perspiciatis accusamus! Itaque illo asperiores autem
        culpa ratione accusantium amet, minus, delectus tenetur, sed pariatur
        nulla mollitia maxime dolores illum explicabo eius. Earum accusamus
        necessitatibus perspiciatis? Nesciunt molestiae atque aliquid, rerum
        recusandae aspernatur, aut sequi eum exercitationem dolorem provident
        nisi asperiores, illo facere fugiat suscipit placeat id. Ut quasi
        aliquid qui laborum officiis, accusantium necessitatibus ad quas tempora
        repudiandae perferendis minus quod dolores blanditiis iste neque, sit,
        asperiores ab hic error libero atque pariatur! Aliquam ea quaerat harum
        iure debitis illo corporis dignissimos, exercitationem error magnam.
        Deleniti, blanditiis amet consequatur eveniet ipsum labore debitis alias
        corporis laboriosam quisquam reiciendis praesentium officiis
        exercitationem quibusdam, quod, ab dignissimos dicta ea assumenda culpa
        fugit quidem iste? Eum dolorum molestias magni adipisci nulla quaerat,
        provident sunt. Provident ut in non qui rem impedit veritatis cumque
        placeat, eos beatae exercitationem molestiae nemo, quibusdam tempora
        minus laborum repellat nulla nihil eius ipsa vel odit eaque. Repellendus
        quod est voluptas ullam sit ipsa, ut beatae nesciunt necessitatibus unde
        debitis explicabo voluptatem fugit laborum officia soluta vel sunt,
        asperiores iste natus nostrum, magni delectus. Est enim exercitationem
        atque, totam similique aut eos, quos magni quam rem, suscipit illo
        eveniet quasi! Blanditiis qui, sequi sed quaerat quibusdam quas,
        repudiandae tempore dolore eligendi pariatur nihil quis? Velit nostrum
        atque, voluptatibus aliquid maxime dolor, possimus voluptatem veritatis
        voluptates qui quia id accusantium libero esse ex ullam omnis quo
        debitis doloremque accusamus. Qui cupiditate aliquid repudiandae
        accusantium eos sequi, vero harum facere hic sapiente rem et ab magni
        distinctio. Optio fugit accusamus amet obcaecati corrupti tempore cumque
        consectetur odio pariatur est eaque molestiae, unde blanditiis laborum
        dignissimos quo nostrum porro omnis veniam expedita repellat labore
        tempora molestias. Veritatis soluta dolorem reiciendis!
        <form onSubmit={handleAuth}>
          <input
            type="password"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="mb-4">
        <label className="mr-2">Width:</label>
        <input
          type="number"
          value={iframeWidth}
          onChange={(e) => setIframeWidth(Number(e.target.value))}
          className="border border-gray-400 px-2 py-1 w-20 mr-4"
        />
        <label className="mr-2">Height:</label>
        <input
          type="number"
          value={iframeHeight}
          onChange={(e) => setIframeHeight(Number(e.target.value))}
          className="border border-gray-400 px-2 py-1 w-20"
        />
      </div>

      <iframe
        width={iframeWidth}
        height={iframeHeight}
        src="https://www.youtube.com/embed/tNm_NNSB3_w?si=s9_fMI8_EPO4xfoS"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}
