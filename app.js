'use strict';
const residents=[
{id:'owen',name:'Owen',role:'木匠',goal:'攒齐工坊扩建材料，扩大自主权。',knows:'真实施工工时与工具缺口',principle:'已收材料的订单不能赖账'},
{id:'mara',name:'Mara',role:'餐馆经营者',goal:'完成供餐订单，获得稳定客源。',knows:'预订量与客流',principle:'不能交付变质餐食'},
{id:'samira',name:'Samira',role:'种植者',goal:'售出将过期的收成，争取长期销路。',knows:'成熟时间与实际存量',principle:'承诺留货后不能重复出售'},
{id:'dani',name:'Dani',role:'采购者',goal:'完成可靠交付，保住中间人地位。',knows:'已取得的运输通知与可用批次',principle:'已验收货物必须结算'},
{id:'gabriel',name:'Gabriel Ward',role:'神父',goal:'推动教堂活动与共同照护，让调解得到认可。',knows:'居民自愿诉说的担忧与意向，受保密约定约束',principle:'尊重私下诉说的保密约定，不以信仰强迫支持'},
{id:'avery',name:'Avery Reed',role:'新居民',goal:'完成首次合作，获得稳定工作与归属。',knows:'自己的空闲工时与亲眼所见',principle:'不能冒领他人劳动'}
];
document.querySelector('#resident-grid').innerHTML=residents.map(r=>`<article class="resident"><img src="assets/${r.id}.png" alt="${r.name}头像" width="52" height="52" loading="lazy"><div class="resident-content"><p class="person-name">${r.name}</p><h4>${r.role}</h4><p>${r.goal}</p><details><summary>信息优势与个人原则</summary><p>知道：${r.knows}。</p><p>希望遵守：${r.principle}。</p></details></div></article>`).join('');
const extension=[
{id:'theo',name:'Theo',role:'修理匠',goal:'完成工具维修，建立独立口碑。'},
{id:'june',name:'June',role:'食摊经营者',goal:'完成备餐销售，争取稳定摊位。'},
{id:'idris',name:'Idris',role:'搬运协调者',goal:'完成短途交接，争取运输机会。'},
{id:'ruth',name:'Ruth',role:'仓储经营者',goal:'取得保管委托，提高仓位利用。'},
{id:'luis',name:'Luis',role:'园艺供给者',goal:'交付错期作物，建立另一条销路。'},
{id:'nell',name:'Nell',role:'活动联络者',goal:'组织有人到场的交流；经认可可协调项目。'}
];
document.querySelector('#extension-grid').innerHTML=extension.map(r=>`<article class="extension-resident"><img src="assets/${r.id}.png" alt="${r.name}头像" width="52" height="52" loading="lazy"><div><p class="person-name">${r.name}</p><h4>${r.role}</h4><p>${r.goal}</p></div></article>`).join('');
const branches={
 hidden:{steps:[['第 1 轮','选择性披露','Dani 选择公开发言，只公布木材短缺，并声称先扩工坊才有运输保障。'],['回合之间','支持转向工坊','玩家甲据此支持工坊。码头可用时段仍是世界里的事实。'],['后续机会','信息优势可能获利','工坊合作方可能先拿到有限工程机会；这不是必然结局。'],['未取得原始证据','说法尚未被揭穿','错误认知可能继续影响合作，不能凭观众全知自动纠正。']],result:'可能的结果：支持与工程机会偏向工坊合作方。世界账本不会因为 Dani 的说法，把码头时段直接删掉。'},
 revealed:{steps:[['第 1 轮及回合间','披露与取证','Dani 以公开发言行动发出选择性说法，玩家甲支持工坊；玩家乙取得可公开的码头凭据，交给临时项目协调者。'],['第 2 轮','撤回未执行意向','协调者核实后选择撤回工坊支持意向。这一轮不同时再发新委托。'],['第 3 轮','公开原始证据','协调者选择公开发言作为主要行动公布证据，让其他人能检查依据；不再附加第二条消息。'],['第 4 轮与之后','新委托改变材料去向','协调者再提出码头优先委托；玩家甲随后交付材料。后续要求 Dani 出示原件等行动，分别占用独立回合。']],result:'可能的结果：玩家甲将材料交向码头；后续采购合作与对 Dani 的凭据要求也可能改变。已完成的合法交换不被追溯抹除。'}
};
const cases=[
{title:'同一批木材，揭露前后两条路径。',intro:'比较的是可执行选择和合作结果。切换证据条件，不改变原本的世界事实。'},
{title:'传闻被核实后，原合同继续履行。',intro:'实际只取消了晚餐，午餐合同仍有效。',steps:[['第 1 轮','听到含糊消息','新居民听到“餐馆取消订单”。'],['回合间 → 第 2 轮','暂停新增意向','玩家乙转述给 Samira；她暂停新增餐馆意向，但保留已锁定的货。'],['再次取证','玩家交出午餐凭据','玩家甲取得并转交仍有效的午餐合同记录。'],['再下一轮','更正认知与后续合作','Samira 恢复后续合作，原午餐合同照常执行。']],result:'核实避免了新增合作继续停滞。可信度只针对这次误传调整，不把新居民直接判成骗子。'},
{title:'更有利的机会出现，履约仍有成本。',intro:'本例预设已有维修合同、所需位置和一轮维修工期；缺少条件时必须增加对应轮次。',steps:[['第 1 轮','签订已有维修合同','Owen 选择签订此前已发布的码头维修合同，并锁定材料。'],['第 2 轮','工坊机会出现','更有利的工坊扩建机会出现；材料不能被重复占用。'],['回合之间','真人改变可选条件','玩家甲依据 Owen 已有且有效的限额收礼授权提供材料；玩家乙提交可核验的公共收益说明。'],['第 3 轮与之后','执行维修，再排扩建','Owen 选择维修工作；本例预设的一轮工期结束后，码头恢复，工坊留待下一时段。']],result:'若没有限额收礼授权，须另用一轮接受赠与，再安排维修，不能合并。Owen 也可按合同取消、返还并记录失约；规则不强制角色转向奉献。'}
];
function flowMarkup(steps){return `<ol class="case-flow">${steps.map(([time,title,body])=>`<li><span>${time}</span><h4>${title}</h4><p>${body}</p></li>`).join('')}</ol>`;}
function renderBranch(key){const b=branches[key];document.querySelector('#branch-result').innerHTML=flowMarkup(b.steps)+`<div class="case-result"><strong>合作结果</strong>${b.result}</div>`;document.querySelectorAll('[data-branch]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.branch===key)));}
function showCase(index){const c=cases[index];document.querySelector('#case-content').innerHTML=`<h3 class="case-title">${c.title}</h3><p class="case-intro">${c.intro}</p>`+(index===0?`<div class="branch-controls" role="group" aria-label="选择证据条件"><button type="button" data-branch="hidden" aria-pressed="false">暂未揭露</button><button type="button" data-branch="revealed" aria-pressed="true">取得并公开证据</button></div><div id="branch-result"></div><p class="case-caveat">无法证明 Dani“明知不实”时，只记错误或误导，不直接判故意撒谎。</p>`:flowMarkup(c.steps)+`<div class="case-result"><strong>合作结果</strong>${c.result}</div>`);document.querySelectorAll('[data-case]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.case)===index)));if(index===0){document.querySelectorAll('[data-branch]').forEach(button=>button.addEventListener('click',()=>renderBranch(button.dataset.branch)));renderBranch('revealed');}}
document.querySelectorAll('[data-case]').forEach(button=>button.addEventListener('click',()=>showCase(Number(button.dataset.case))));showCase(0);
