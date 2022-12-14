/* 
html 목차 생성

*/

onload(function() {

    var toc = document.getElementById("TOC");
    if (!toc) {
        toc = document.createElement("div");
        toc.id = "TOC"
        document.body.insertBefore(toc, document.body.firstChild);
    }

    var headings;
    if (document.querySelectorAll)
        headings = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
    else
        headings = findHeadings(document.body, []);

    //내장함수
    function findHeadings(root, sects) { // 위 headings 에서 호출함              
        for (var c = root.firstChild; c != null; c = c.nextSibling) { //전체 태그 순회              
            if (c.nodeType !==1) continue;
            if (c.tagName.length == 2 && c.tagName.charAt(0) == "H")
                sects.push(c);
            else findHeadings(c, sects);
        }
        return sects; //매개변수에 추가하여 반환 가능
    }

    var sectionNumbers = [0,0,0,0,0,0];

    for (var h=0; h< headings.length; h++) {
        var heading = headings[h];

        if (heading.parentNode == toc) continue;

        var level = parseInt(heading.tagName.charAt(1)); //공백포함 위치, H1~6의 숫자
        if (isNaN(level) || level < 1 ||level > 6) continue;

        sectionNumbers[level-1]++; // 인덱스 0에서 시작, 5 6 7 8증가 카운터 
        for (var i = level; i<6; i++) sectionNumbers[i] = 0; // 시작점을 해당레벨에서부터, 초기화기

        var sectionNumber = sectionNumbers.slice(0,level).join("."); //마지막 인덱스 제외 1.1.1.
        var span = document.createElement("span");
        span.className = "TOCSectNum";
        span.innerHTML = sectionNumber;
        heading.insertBefore(span, heading.firstchild);

        var anchor = document.createElement("a");
        anchor.name = "TOC"+sectionNumber;
        heading.parentNode.insertBefore(anchor,heading);
        anchor.appendChild(heading);

        var link = document.createElement("a");
        link.href = "TOC" + sectionNumber;
        link.innerHTML = heading.innerHTML;

        var entry = document.createElement("div");
        entry.className = "TOCEntry TOCLevel" + level;
        entry.appendChild(link);

        toc.appendChild(entry);

        
    }


});