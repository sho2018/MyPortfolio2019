(function() {
  "use strict";
  const name = document.getElementById("name");
  const Button = document.getElementById("assessment");
  const result = document.getElementById("result");
  const tweet = document.getElementById("tweet");

  function removeAllChildren(element) {
    while (element.firstChild) {
      // 表示がある限り消す
      element.removeChild(element.firstChild);
    }
  }

  Button.onclick = () => {
    const userName = name.value;
    console.log(userName);
    if (userName.length === 0) {
      return;
    }

    // 結果エリアの作成
    removeAllChildren(result);
    const header = document.createElement("h3");
    header.innerText = "診断結果";
    result.appendChild(header);

    const div = document.createElement("div");
    div.className = "resultimg";
    const img = document.createElement("img");
    const imgIndex = calc(userName);
    img.src = "../images/" + imgIndex + ".png";
    div.appendChild(img);
    result.appendChild(div);

    const paragraph = document.createElement("p");
    const newresult = assessment(userName);
    paragraph.innerText = newresult;
    result.appendChild(paragraph);

    // ツイートエリアの作成
    removeAllChildren(tweet);
    const anchor = document.createElement("a");
    const hrefValue =
      "https://twitter.com/intent/tweet?button_hashtag=" +
      encodeURIComponent("あなたは何松？") +
      "&ref_src=twsrc%5Etfw";
    anchor.setAttribute("href", hrefValue);
    anchor.className = "twitter-hashtag-button";
    anchor.setAttribute("data-text", newresult);
    anchor.innerText = "Tweet #あなたは何松？";
    tweet.appendChild(anchor);

    twttr.widgets.load();
  };

  const answers = [
    "{userName}さんは松野おそ松タイプ、小学校6年生のまま成長してしまった奇跡のバカタイプ！",
    "{userName}さんは松野カラ松タイプ、６つ子の中では参謀のような存在で基本的にクールでカッコつけている！",
    "{userName}さんは松野チョロ松タイプ、６つ子の中では唯一の常識人。ツッコミ担当！",
    "{userName}さんは松野一松タイプ、マイペースな皮肉屋で、しれっと毒をはく。猫が大好き！",
    "{userName}さんは松野十四松タイプ、６つ子の中では核弾頭的な存在で、以上に明るく以上にバカである！",
    "{userName}さんは松野トド松タイプ、甘え上手で世渡り上手なので、みんなから可愛がってもらえる！"
  ];

  function assessment(userName) {
    let calcResult = calc(userName);
    let result = answers[calcResult];
    // gフラグは全て置き換える
    result = result.replace(/{userName}/g, userName);
    return result;
  }

  function calc(userName) {
    // 名前のコード番号を取得して全部たす
    let sumOfcode = 0;
    for (let i = 0; i < userName.length; i++) {
      sumOfcode = sumOfcode + userName.charCodeAt(i);
    }
    // 合計をデータの数で割って添字の数を求める
    const calcResult = sumOfcode % answers.length;
    return calcResult;
  }

  // テスト
  console.assert(
    assessment("太郎") ===
      "太郎さんは松野十四松タイプ、６つ子の中では核弾頭的な存在で、以上に明るく以上にバカである！",
    "診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。"
  );
  console.assert(
    assessment("太郎") === assessment("太郎"),
    "入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。"
  );
})();
