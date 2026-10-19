'use strict';
const residents = [
 {id:'owen',name:'Owen',role:'木匠',goal:'“先把我的工坊扩起来。”',want:'扩大工坊自主权',knows:'真实施工工时与工具缺口',principle:'已收材料的订单不能赖账',visible:'材料堆、施工进度、开放后的工作台'},
 {id:'mara',name:'Mara',role:'餐馆经营者',goal:'“让客人下次还愿意来。”',want:'拿到稳定客源',knows:'预订量与客流',principle:'不能交付变质餐食',visible:'备餐、营业、供餐队伍与空桌'},
 {id:'samira',name:'Samira',role:'种植者',goal:'“这批收成，别等到坏掉。”',want:'获得长期销路',knows:'成熟时间与实际存量',principle:'承诺留货后不能重复出售',visible:'采收、装筐与仓储变化'},
 {id:'dani',name:'Dani',role:'采购者',goal:'“这次交付，得由我来牵线。”',want:'保持中间人地位',knows:'已取得的运输通知与可用批次',principle:'已验收货物必须结算',visible:'码头收货、仓库装卸与交接'},
 {id:'gabriel',name:'Gabriel Ward',role:'神父',goal:'“让人愿意走进教堂，坐下来谈谈。”',want:'教堂影响力与自己的调解得到认可',knows:'居民自愿诉说的担忧与意向，受保密约定约束',principle:'保守私下诉说的秘密，不以信仰强迫支持',visible:'教堂活动、预约调解与共同照护'},
 {id:'avery',name:'Avery Reed',role:'新居民',goal:'“在这儿，找到我的位置。”',want:'获得稳定工作与归属',knows:'自己的空闲工时与亲眼所见',principle:'不能冒领他人劳动',visible:'到岗、搬运、学习与获得工作位置'}
];
document.querySelector('#resident-grid').innerHTML = residents.map(r=>`<article class="resident"><div class="resident-top"><div class="portrait"><img src="assets/${r.id}.png" alt="${r.name}的既有居民形象" width="104" height="104" loading="lazy"></div><div><p class="person-name">${r.name}</p><h3>${r.role}</h3></div></div><p class="goal">${r.goal}</p><dl><dt>私心</dt><dd>${r.want}</dd><dt>信息优势</dt><dd>${r.knows}</dd><dt>个人原则</dt><dd>${r.principle}</dd></dl><details><summary>在小镇里看见什么</summary><p>${r.visible}。这些属于待实现的事件演出。</p></details></article>`).join('');
const cases = [
 {title:'证据，让支持转了方向。',steps:[['第 1 轮','选择性披露','Dani 只说木材短缺，隐去码头仍有运输时段；玩家甲据此支持工坊。'],['第 2 轮','凭据改变支持意向','玩家乙在回合间交出可公开的码头时段证据。本次临时推举的项目协调者核实后，选择撤回尚未执行的工坊支持意向。'],['第 3、4 轮与之后','一步步调整合作','第 3 轮单独公开证据，第 4 轮再提出码头优先委托。玩家甲随后交付材料；要求 Dani 出示原件等行动，也分别占用后续回合。']],branch:'如果未被揭穿，短期信息优势可能获利。已完成的合法交易不追溯抹除；无法证明“明知”，就不判故意撒谎。'},
 {title:'把传闻拆开，合作就能继续。',steps:[['第 1 轮','“餐馆取消订单了”','新居民听到一句传闻。实际取消的是晚餐，午餐合同仍有效。'],['回合之间 → 第 2 轮','误传影响新的意向','玩家乙转述消息；Samira 暂停新增餐馆意向，但保留已经锁定的货物。玩家甲取得午餐合同凭据。'],['再下一轮','核实后恢复合作','凭据送达，Samira 更正认知，恢复后续合作。原午餐合同照常交付，既有货物没有凭空损失。']],branch:'若没有核实，新增合作可能继续停滞。可信度只针对这次误传调整，不能把新居民直接判成骗子。'},
 {title:'守约，要付出真实的机会成本。',steps:[['第 1 轮','先接下码头维修','Owen 接受合同并锁定材料，承担清楚的交付义务。'],['第 2 轮','更有利的机会出现','工坊扩建更符合他的私利。玩家甲提供额外材料，玩家乙提交可核验的公共收益说明。'],['第 3 轮与之后','先履约，再谈扩建','Owen 选择先修码头，工坊留待下一时段。后续合作看实际记录，而非“我成长了”的自述。']],branch:'Owen 也可以按合同取消，并按既定规则返还、记录失约；材料不能被重复占用，信任可能下降。不强制角色转向奉献。'}
];
function showCase(index){const c=cases[index];document.querySelector('#case-content').innerHTML=`<div class="case-title"><h3>${c.title}</h3><span>示例分支 · 不代表实测结果</span></div><ol class="timeline">${c.steps.map(([time,title,body])=>`<li><span>${time}</span><h4>${title}</h4><p>${body}</p></li>`).join('')}</ol><p class="branch"><strong>另一种可能</strong>${c.branch}</p>`;document.querySelectorAll('[data-case]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.case)===index)));}
document.querySelectorAll('[data-case]').forEach(b=>b.addEventListener('click',()=>showCase(Number(b.dataset.case))));
showCase(0);

const extension = [
 {id:'theo',name:'Theo',role:'修理匠',goal:'建立独立口碑，完成工具维修。',knows:'修理成本与旧工具潜力',link:'提供部分维护替代，无法替代大型施工。'},
 {id:'june',name:'June',role:'食摊经营者',goal:'争取稳定摊位，完成备餐销售。',knows:'另一时段的客流',link:'与餐馆争食材，也可分时承接供餐。'},
 {id:'idris',name:'Idris',role:'搬运协调者',goal:'争取运输机会，完成短途交接。',knows:'自己的运力与已知路况',link:'提供局部物流替代，不掌握全部货源。'},
 {id:'ruth',name:'Ruth',role:'仓储经营者',goal:'提高仓位利用，取得保管委托。',knows:'可用仓位与保鲜期限',link:'需要木匠修缮，也能降低种植损耗。'},
 {id:'luis',name:'Luis',role:'园艺供给者',goal:'建立另一销路，交付错期作物。',knows:'自己的收成与种植条件',link:'与种植者竞争，也能互补缺货时段。'},
 {id:'nell',name:'Nell',role:'活动联络者',goal:'获得关注，组织有人到场的交流。',knows:'自愿告知的空闲与参与意向',link:'需要餐食、设施和运输；经居民认可可协调公共项目。'}
];
document.querySelector('#extension-grid').innerHTML=extension.map(r=>`<article class="extension-resident"><img src="assets/${r.id}.png" alt="${r.name}的既有居民形象" width="70" height="70" loading="lazy"><div><p class="person-name">${r.name}</p><h3>${r.role}</h3><p>${r.goal}</p><details><summary>信息与合作</summary><p>信息优势：${r.knows}。${r.link}</p></details></div></article>`).join('');
