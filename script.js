const pages = Array.from(document.querySelectorAll(".page"));
const dots = Array.from(document.querySelectorAll(".dot"));
const timelineList = document.querySelector("#timelineList");
const photoRail = document.querySelector(".photo-rail");
const photoTrack = document.querySelector("#photoTrack");
const celebrationLayer = document.querySelector("#celebrationLayer");

const timelineItems = [
  {
    year: "1956",
    title: "成都地质勘探学院创办",
    desc: "为国家矿产资源勘探与工业建设而生。",
    more: "1956年3月15日，成都地质勘探学院创办，是新中国地质高等教育布局中的重要力量。"
  },
  {
    year: "1958",
    title: "更名成都地质学院",
    desc: "从勘探走向更完整的地质学科建设。",
    more: "学院更名为成都地质学院，地质办学特色进一步确立。"
  },
  {
    year: "1981",
    title: "获硕士学位授予权",
    desc: "人才培养层次进一步提升。",
    more: "学校获得硕士学位授予权，科研与学科建设进入新阶段。"
  },
  {
    year: "1984",
    title: "获博士学位授予权",
    desc: "高层次地学人才培养体系形成。",
    more: "学校获得博士学位授予权，学科建设进入新的发展阶段。"
  },
  {
    year: "1993",
    title: "更名成都理工学院",
    desc: "从地质学院迈向多学科理工发展。",
    more: "成都地质学院更名为成都理工学院，学校发展空间进一步拓展。"
  },
  {
    year: "2001",
    title: "组建成都理工大学",
    desc: "进入综合性理工大学发展阶段。",
    more: "经教育部批准，成都理工学院等单位合并组建成都理工大学。"
  },
  {
    year: "2017",
    title: "入选首批双一流",
    desc: "成理迈入国家双一流建设高校行列。",
    more: "学校进入国家一流学科建设高校行列。"
  },
  {
    year: "2026",
    title: "建校70周年",
    desc: "七秩风华，网述成理。",
    more: "2026年，成都理工大学迎来建校70周年。"
  }
];

const fallbackWishLibrary = {
  general: [
    "祝成都理工大学建校70周年快乐！愿成理薪火相传，桃李芬芳，再攀高峰。",
    "七十载风雨兼程，七十载春华秋实。愿成理在新的征程上继续书写辉煌。",
    "从砚湖畔到山海间，成理人的脚步从未停歇。祝母校70周年生日快乐！"
  ],
  student: [
    "在成理的每一天，都是青春里闪亮的一页。祝母校70周年快乐，也祝我们都能成为更好的自己。",
    "青春正好，成理正好。愿每一位成理学子都能在这里找到方向、积蓄力量、奔向未来。",
    "七十岁的成理，依然年轻而热烈。愿我们带着成理精神，走向更远的山海。"
  ],
  alumni: [
    "无论走到哪里，成理都是我心中最温暖的坐标。祝母校70周年华诞快乐！",
    "一朝成理人，一生成理情。祝母校七十周年生日快乐，愿桃李满天下，声誉传四方。",
    "从二仙桥出发，走向五湖四海。祝母校七秩华诞，未来可期。"
  ],
  teacher: [
    "七十年弦歌不辍，七十年育人不息。愿成理继续坚守立德树人初心，培养更多优秀人才。",
    "扎根讲台，服务学生；心系成理，共赴未来。祝母校七秩芳华，蒸蒸日上。",
    "与成理同行，是责任，也是荣光。祝学校70周年生日快乐！"
  ],
  team: [
    "七秩风华正青春，凝心聚力向未来。祝成都理工大学70周年生日快乐！",
    "山海见证初心，岁月镌刻荣光。祝成都理工大学70周年华诞快乐！",
    "以热爱致敬母校，以行动奔赴未来。祝成理70周年快乐！"
  ]
};

let wishLibrary = fallbackWishLibrary;

let currentPage = 0;
let photoDragStartX = 0;
let photoDragStartScroll = 0;
let isPhotoDragging = false;

function renderTimeline() {
  timelineList.innerHTML = timelineItems
    .map(
      (item, index) => `
        <button class="timeline-item ${index === 0 ? "open" : ""}" type="button" style="--i:${index}">
          <span class="timeline-year">${item.year}</span>
          <span>
            <span class="timeline-title">${item.title}</span>
            <p class="timeline-desc">${item.desc}</p>
            <span class="timeline-more">${item.more}</span>
          </span>
        </button>
      `
    )
    .join("");

  timelineList.querySelectorAll(".timeline-item").forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("open");
    });
  });
}

function renderSparks() {
  if (!celebrationLayer) return;
  const count = 34;
  celebrationLayer.innerHTML = Array.from({ length: count })
    .map((_, index) => {
      const left = Math.round((index / count) * 100 + Math.random() * 8 - 4);
      const size = Math.round(Math.random() * 4 + 3);
      const duration = (Math.random() * 4 + 5).toFixed(2);
      const delay = (Math.random() * -7).toFixed(2);
      const drift = Math.round(Math.random() * 120 - 60);
      return `<span class="spark" style="left:${left}%;--size:${size}px;--duration:${duration}s;--delay:${delay}s;--drift:${drift}px"></span>`;
    })
    .join("");
}

function showPage(index) {
  currentPage = Math.max(0, Math.min(index, pages.length - 1));
  pages.forEach((page, pageIndex) => {
    page.classList.toggle("page-active", pageIndex === currentPage);
    page.scrollTop = 0;
  });
  dots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === currentPage));
}

function setupPhotoMarquee() {
  if (!photoTrack) return;
  photoTrack.dataset.ready = "true";
  photoTrack.dataset.originalCount = String(photoTrack.children.length);
  updatePhotoMarqueeDistance();
}

function updatePhotoMarqueeDistance() {
  if (!photoTrack) return;
  const distance = Math.max(photoTrack.scrollWidth - (photoRail?.clientWidth || 0), 0);
  photoTrack.style.setProperty("--marquee-distance", `${distance}px`);
  photoTrack.style.setProperty("--marquee-offset", `-${distance}px`);
}

function parseWishSection(markdown, heading) {
  const start = markdown.indexOf(heading);
  if (start === -1) return [];
  const rest = markdown.slice(start + heading.length);
  const end = rest.search(/\n##\s/);
  const section = end === -1 ? rest : rest.slice(0, end);
  return section
    .split(/\r?\n/)
    .map((line) => line.trim())
    .map((line) => line.replace(/^\d+\.\s*/, "").replace(/^-\s*/, ""))
    .filter((line) => line && !line.startsWith("#") && !line.startsWith("###"))
    .filter((line) => line.length > 14);
}

async function loadWishLibrary() {
  try {
    const response = await fetch("./祝福卡文案库.md", { cache: "no-store" });
    if (!response.ok) throw new Error("祝福文案文件读取失败");
    const markdown = await response.text();
    const parsed = {
      general: parseWishSection(markdown, "## 二、通用祝福语"),
      student: parseWishSection(markdown, "## 三、学生视角"),
      alumni: parseWishSection(markdown, "## 四、校友视角"),
      teacher: parseWishSection(markdown, "## 五、教师/教职工视角"),
      team: parseWishSection(markdown, "## 六、学院/班级/团队署名适用")
    };
    const hasContent = Object.values(parsed).some((items) => items.length > 0);
    if (hasContent) {
      wishLibrary = Object.fromEntries(
        Object.entries(parsed).map(([role, items]) => [role, items.length ? items : fallbackWishLibrary[role]])
      );
    }
  } catch {
    wishLibrary = fallbackWishLibrary;
  }
}

function getWishPool() {
  const role = document.querySelector("#roleInput").value;
  return wishLibrary[role] || wishLibrary.general || fallbackWishLibrary.general;
}

function randomWish() {
  const pool = getWishPool();
  const nextWish = pool[Math.floor(Math.random() * pool.length)];
  document.querySelector("#wishInput").value = nextWish;
  updateCard();
}

function updateCard() {
  const name = document.querySelector("#nameInput").value.trim() || "成理人";
  const college = document.querySelector("#collegeInput").value.trim();
  const wish = document.querySelector("#wishInput").value.trim() || getWishPool()[0];
  const sign = college ? `${college} ${name} 敬贺` : `${name} 敬贺`;

  document.querySelector("#cardText").textContent = wish;
  document.querySelector("#cardSign").textContent = sign;
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function drawTintedImage(ctx, image, x, y, width, height, color) {
  const offscreen = document.createElement("canvas");
  offscreen.width = width;
  offscreen.height = height;
  const offscreenCtx = offscreen.getContext("2d");
  offscreenCtx.drawImage(image, 0, 0, width, height);
  offscreenCtx.globalCompositeOperation = "source-in";
  offscreenCtx.fillStyle = color;
  offscreenCtx.fillRect(0, 0, width, height);
  ctx.drawImage(offscreen, x, y);
}

function drawRotatedImage(ctx, image, x, y, width, height, rotation, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(x + width / 2, y + height / 2);
  ctx.rotate(rotation);
  ctx.drawImage(image, -width / 2, -height / 2, width, height);
  ctx.restore();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  const chars = Array.from(text);
  let line = "";
  let lines = 0;

  for (const char of chars) {
    const test = line + char;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = char;
      y += lineHeight;
      lines += 1;
      if (lines >= maxLines - 1) break;
    } else {
      line = test;
    }
  }

  if (line && lines < maxLines) {
    ctx.fillText(line, x, y);
  }
}

async function saveCard() {
  updateCard();
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 900;
  const ctx = canvas.getContext("2d");

  const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  bg.addColorStop(0, "#e52621");
  bg.addColorStop(0.48, "#b70f16");
  bg.addColorStop(1, "#72080d");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  try {
    const leaf = await loadImage("./ginkgo-leaf-gold.png");
    drawRotatedImage(ctx, leaf, 930, 50, 150, 128, 0.35, 0.38);
    drawRotatedImage(ctx, leaf, -38, 650, 178, 153, -0.45, 0.34);
    drawRotatedImage(ctx, leaf, 825, 625, 128, 110, 0.18, 0.2);
  } catch {
    // Decorative leaves are optional; the card remains valid without them.
  }

  ctx.fillStyle = "rgba(255,232,163,0.11)";
  ctx.beginPath();
  ctx.ellipse(760, 440, 420, 150, -0.8, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255,205,98,0.22)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 5; i += 1) {
    ctx.beginPath();
    ctx.moveTo(0, 770 + i * 12);
    ctx.bezierCurveTo(330, 850 + i * 10, 750, 795 + i * 8, 1200, 824 + i * 10);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(255,232,163,0.28)";
  ctx.font = "900 132px Microsoft YaHei, sans-serif";
  ctx.save();
  ctx.translate(1048, 64);
  ctx.rotate(Math.PI / 2);
  ctx.fillText("1956-2026", 0, 0);
  ctx.restore();

  try {
    const logo = await loadImage("./8E063033498B1A3A1A10D91FC59_8ED064FC_2577B_white_cutout_cropped.png");
    drawTintedImage(ctx, logo, 74, 62, 230, 55, "#ffe8a3");
  } catch {
    ctx.fillStyle = "#ffe8a3";
    ctx.font = "900 38px Microsoft YaHei, sans-serif";
    ctx.fillText("成都理工大学", 74, 96);
  }

  ctx.fillStyle = "rgba(255,232,163,0.74)";
  ctx.fillRect(74, 128, 42, 3);

  const numGradient = ctx.createLinearGradient(70, 170, 70, 420);
  numGradient.addColorStop(0, "#fff0b5");
  numGradient.addColorStop(0.48, "#f8c75c");
  numGradient.addColorStop(1, "#ad6b1b");
  ctx.fillStyle = numGradient;
  ctx.font = "900 270px Arial, sans-serif";
  ctx.shadowColor = "rgba(61,5,5,0.42)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 9;
  ctx.fillText("70", 74, 390);
  ctx.shadowColor = "transparent";

  ctx.fillStyle = "#ffe8a3";
  ctx.font = "italic 62px Arial, sans-serif";
  ctx.fillText("th", 392, 378);

  try {
    const title = await loadImage("./card-title-warm.png");
    ctx.drawImage(title, 74, 425, 650, 103);
  } catch {
    ctx.fillStyle = "#ffe8a3";
    ctx.font = "900 64px Microsoft YaHei, sans-serif";
    ctx.fillText("七秩风华，网述成理", 74, 500);
  }

  ctx.fillStyle = "#ffe8a3";
  ctx.font = "500 42px Microsoft YaHei, sans-serif";
  wrapText(ctx, document.querySelector("#cardText").textContent, 74, 600, 660, 62, 4);

  ctx.fillStyle = "#ffe8a3";
  ctx.font = "900 40px Microsoft YaHei, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(`—— ${document.querySelector("#cardSign").textContent}`, 1080, 842);

  const link = document.createElement("a");
  link.download = "成都理工大学70周年祝福卡.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => showPage(currentPage + 1));
});

document.querySelectorAll("[data-prev]").forEach((button) => {
  button.addEventListener("click", () => showPage(currentPage - 1));
});

document.querySelector("#wishForm").addEventListener("submit", (event) => {
  event.preventDefault();
  updateCard();
});

document.querySelector("#randomWish").addEventListener("click", randomWish);
document.querySelector("#saveCard").addEventListener("click", saveCard);
document.querySelector("#roleInput").addEventListener("change", randomWish);

if (photoTrack) {
  window.addEventListener("resize", updatePhotoMarqueeDistance);
  window.addEventListener("load", updatePhotoMarqueeDistance);
}

if (photoRail && photoTrack) {
  photoRail.addEventListener("pointerdown", (event) => {
    isPhotoDragging = true;
    photoDragStartX = event.clientX;
    photoDragStartScroll = photoRail.scrollLeft;
    photoTrack.style.animationPlayState = "paused";
    photoRail.setPointerCapture(event.pointerId);
  });

  photoRail.addEventListener("pointermove", (event) => {
    if (!isPhotoDragging) return;
    const delta = event.clientX - photoDragStartX;
    photoRail.scrollLeft = photoDragStartScroll - delta;
  });

  const endPhotoDrag = (event) => {
    if (!isPhotoDragging) return;
    isPhotoDragging = false;
    photoRail.releasePointerCapture?.(event.pointerId);
    window.setTimeout(() => {
      if (!isPhotoDragging) photoTrack.style.animationPlayState = "";
    }, 1200);
  };

  photoRail.addEventListener("pointerup", endPhotoDrag);
  photoRail.addEventListener("pointercancel", endPhotoDrag);
  photoRail.addEventListener("pointerleave", endPhotoDrag);
}

renderTimeline();
renderSparks();
setupPhotoMarquee();
loadWishLibrary().then(randomWish);
showPage(0);
