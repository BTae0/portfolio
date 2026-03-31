document.addEventListener('DOMContentLoaded', () => {

    // --- Password Gate ---
    const gateBtn = document.getElementById('gate-submit');
    const gateInput = document.getElementById('gate-password');
    const gateError = document.getElementById('gate-error');
    const gateContainer = document.getElementById('password-gate');
    const mainContent = document.getElementById('main-content');

    const unlockPortfolio = () => {
        const password = gateInput.value.trim();
        // The requested default password
        if (password === 'power') {
            gateContainer.style.opacity = '0';
            setTimeout(() => {
                gateContainer.classList.add('hidden');
                mainContent.classList.remove('hidden');
                initScrollObserver(); // start fade-in animations
                renderProjects();     // Render grid initially
            }, 500);
        } else {
            gateError.classList.remove('hidden');
            gateInput.value = '';
            gateInput.focus();
        }
    };

    if (gateBtn && gateInput) {
        gateBtn.addEventListener('click', unlockPortfolio);
        gateInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') unlockPortfolio();
        });
    }

    // --- Data for Modals & Grid ---
    const projectsData = [
        {
            id: 'rpa-1', type: 'rpa',
            shortTitle: '롯데 하이마트 RPA 유지보수/개발', color: '#6c5ce7', icon: 'bx bxs-save',
            bullet1: '프로젝트명: 롯데 하이마트...', bullet2: '주요 업무: 온라인 가격 조사 자동화...',
            title: '롯데 하이마트 RPA 유지보수/개발', company: '롯데 하이마트 / 덱스컨설팅', duration: '2024.01 ~ 2025.10 (22개월)',
            role: '유지보수 고도화 프로젝트 PL / 개발 및 운영 총괄',
            tech: ['Power Automate', 'Outlook', 'FTP', 'SAP', 'SQL', 'VBScript'],
            achievements: '80여개 RPA 과제의 안정성 98% 유지 및 신규 과제 개발 완료',
            desc: '네이버 가격비교 사이트에서 약 2,000건의 제품 데이터를 수집 및 정제하는 프로세스를 자동화하여 수작업 기준 16시간 소요되던 업무를 5시간으로 단축했습니다. 체계적인 유지보수 및 개발 프로세스를 구축하여 시스템 대응 시간을 단축하고 업무 시간을 절감했습니다.<br><br><strong>[주요 프로세스]</strong><br>- 온라인 가격 조사<br>- 전기료 자동이체 (SAP 연동)<br>- 매입/매출 세금계산서 관리<br>- 인증정보검수 자동화<br><br><strong>[문제 해결]</strong><br>온라인 가격 조사 사이트 업데이트로 인한 30%의 성공률 저하 문제를 VM 증설(4대->6대) 및 과제 리뉴얼을 통해 해결했습니다.',
            customHTML: `
            <div class="modal-article" style="padding: 1.5rem;">
                <div class="notion-h2">롯데 하이마트 RPA 유지보수/개발</div>
                
                <!-- 상단 핵심 성과 지표 -->
                <div class="notion-metrics-grid">
                    <div class="metric-card">
                        <span class="metric-value">98%</span>
                        <span class="metric-label">시스템 안정성 유지</span>
                    </div>
                    <div class="metric-card">
                        <span class="metric-value">80+</span>
                        <span class="metric-label">RPA 운영 과제</span>
                    </div>
                    <div class="metric-card">
                        <span class="metric-value">68%</span>
                        <span class="metric-label">업무 시간 절감</span>
                    </div>
                </div>

                <table class="notion-props-table">
                    <tr>
                        <td class="prop-label"><i class='bx bx-calendar'></i> Date</td>
                        <td class="prop-value">2024.01~2025.10</td>
                    </tr>
                    <tr>
                        <td class="prop-label"><i class='bx bxs-tag-alt'></i> Tags</td>
                        <td class="prop-value">
                            <span class="m-tag" style="background: rgba(131, 56, 236, 0.2); color: #cba6f7;">Power Automate</span>
                            <span class="m-tag">Outlook</span>
                            <span class="m-tag">FTP</span>
                            <span class="m-tag">SAP</span>
                            <span class="m-tag" style="background: rgba(255, 107, 129, 0.2); color: #ff6b81;">SQL</span>
                            <span class="m-tag">VBScript</span>
                        </td>
                    </tr>
                </table>

                <div class="notion-h3">1. 프로젝트 개요</div>
                <div class="notion-callout">
                    <i class='bx bxs-info-circle'></i>
                    <div class="notion-callout-text">
                        롯데 하이마트 전사의 80여 개 RPA 프로세스를 안정적으로 운영하고, 시스템 업데이트 및 비즈니스 로직 변경에 따른 고도화와 신규 프로세스 개발을 총괄했습니다.
                    </div>
                </div>

                <div class="notion-h3">2. 요구사항 및 역할</div>
                <div class="notion-emoji-title">👨‍💻 담당 역할 : Project Leader</div>
                <ul class="notion-ul">
                    <li>RPA 운영 및 개발 총괄 리딩 (Communication & Management)</li>
                    <li>기존 80여 개 프로세스 유지보수 및 안정성 관리)</li>
                    <li>하이마트 전사 RPA 프로세스 고도화 및 신규 과제 개발</li>
                    <li>현업 담당자 대상 Microsoft Power Automate 기술 교육 지원</li>
                </ul>

                <div class="notion-h3">3. 주요 자동화 프로세스</div>
                <div class="notion-table-wrap">
                    <table class="notion-table">
                        <thead>
                            <tr>
                                <th>과제명</th>
                                <th>주요 내용 및 자동화 범위</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>온라인 가격 조사</td>
                                <td>약 2,000건의 네이버 제품 데이터를 자동 수집 및 자사 데이터와 비교 분석</td>
                            </tr>
                            <tr>
                                <td>전기료 자동이체</td>
                                <td>납부 데이터 정제 후 SAP 전표 생성 및 HICOSS 결재 상신 자동화</td>
                            </tr>
                            <tr>
                                <td>세금계산서 관리</td>
                                <td>매월 결산용 매입/매출 세금계산서 데이터 통합 및 검증 자동화</td>
                            </tr>
                            <tr>
                                <td>인증정보검수</td>
                                <td>자사 사이트 게시 제품의 효율등급 및 저감 확인 자동화</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="notion-h3">4. 문제 해결 및 성과</div>
                <div class="notion-check-title"><i class='bx bxs-bolt-circle'></i> 성능 최적화: 온라인 가격 조사</div>
                
                <div class="before-after-grid">
                    <div class="ba-item">
                        <span class="ba-label before">Before</span>
                        <div class="ba-value">16시간</div>
                    </div>
                    <div class="ba-arrow"><i class='bx bx-right-arrow-alt'></i></div>
                    <div class="ba-item">
                        <span class="ba-label after">After</span>
                        <div class="ba-value" style="color: #55efc4;">5시간</div>
                    </div>
                </div>

                <div class="notion-quote">
                    기존 수작업으로 16시간 이상 소요되던 대규모 데이터 수집 업무를 5시간 이내로 단축시켰으며, VM 증축 및 로직 리뉴얼을 통해 성공률을 30%에서 98%로 끌어올렸습니다.
                </div>

                <div class="notion-h3">5. 기술적 도전</div>
                <div class="notion-check-title"><i class='bx bxs-component'></i> 프로세스 안정화: SAP 예외 처리</div>
                
                <div class="before-after-grid">
                    <div class="ba-item">
                        <span class="ba-label before">Before</span>
                        <div class="ba-value">현업 수동 개입</div>
                    </div>
                    <div class="ba-arrow"><i class='bx bx-right-arrow-alt'></i></div>
                    <div class="ba-item">
                        <span class="ba-label after">After</span>
                        <div class="ba-value" style="color: #55efc4;">자동 에러 핸들링</div>
                    </div>
                </div>

                <div class="notion-quote" style="border-left-color: #ff7675;">
                    SAP 데이터 입력 후 발생하는 예외 상황을 처리하기 위한 VBScript 기반의 에러 핸들링 로직을 구축하여, 현업의 개입 없이도 자동화가 안정적으로 수행되도록 개선했습니다.
                </div>
            </div>
            `,
            // 여기에 파일명만 적으면 팝업 가장 아래에 자동으로 버튼이 만들어집니다!
            // 로컬 구조: files/rpa-1/파일명
            files: [
                '프라이싱TFT팀_온라인_가격조사.pptx',
                '전기료_자동이체.pptx'
            ],
            screenshots: [
                { url: 'images/rpa-1/lotte_console.png', caption: '유지보수 관리 보고 사이트' },
                { url: 'images/rpa-1/lotte_dashboard_real.jpg', caption: '운영 현황 대시보드' },
                { url: 'images/rpa-1/lotte_checklist.png', caption: 'RPA 일일 체크리스트' },
                { url: 'images/rpa-1/lotte_plan.jpg', caption: 'RPA 개발 및 고도화 일정 관리' },
                { url: 'images/rpa-1/lotte_schedule_1.jpg', caption: '월별 근무 일정표 자동화' }
            ],
            startDate: '2024-01-01',
            endDate: '2025-10-01'
        },
        {
            id: 'rpa-2', type: 'rpa',
            shortTitle: 'GS Retail 하반기 RPA 개발', color: '#6c5ce7', icon: 'bx bxs-save',
            bullet1: '프로젝트명: GS Retail...', bullet2: '담배 고시공고 데이터 수집 (90% 단축)',
            title: 'GS리테일 하반기 RPA 개발 프로젝트', company: 'GS리테일 / 덱스컨설팅', duration: '2023.10 ~ 2023.11 (1개월)',
            role: 'RPA 프로세스 개발', tech: ['Power Automate', 'VBScript', 'Web 크롤링', 'SQL', 'Teams', 'Outlook'],
            achievements: '담배 고시공고 데이터 수집 시간 90% 단축.',
            desc: '기존 전국 250개 지자체 담배 고시공고 데이터를 일일히 접속하여 수집하였으나, 자동 수집 및 정제하는 시스템을 구축하여 기존 일 8시간 소요되던 업무를 30분으로 단축했습니다. 또한 수집된 데이터를 정제하여 데이터 정확도를 획기적으로 향상시켰습니다.',
            files: [], // 빈 칸에 파일명을 적으면 됩니다. (예: files/rpa-2/여기에넣기)
            startDate: '2023-10-01',
            endDate: '2023-11-01'
        },
        {
            id: 'rpa-3', type: 'rpa',
            shortTitle: '게스코리아 2차 RPA 시스템 구축', color: '#6c5ce7', icon: 'bx bxs-save',
            bullet1: '프로젝트명: 게스코리아 2차...', bullet2: '근무 일정 관리(Shiftee) 자동화',
            title: '메스코리아 2차 RPA 시스템 구축 및 기업교육', company: '게스코리아 / 덱스컨설팅', duration: '2023.07 ~ 2023.09 (3개월)',
            role: 'PAD(Power Automate Desktop) 기반 RPA 개발, 기업교육 진행', tech: ['Power Automate', 'Web 크롤링', 'SQL', 'VBScript', 'Outlook'],
            achievements: '근무 일정 관리 및 미준수자 선별 업무 시간 80% 단축.',
            desc: '시프티(Shiftee) 시스템에서 근무 타입별 직원 분류 및 자동 일정 관리 프로세스를 구축하여 수작업을 자동화했습니다. 개인별 근무 타입에 관한 잔여일, 위반 사항 등 알림 메일 발송 및 규정에 맞추어 근무 타입 변경을 자동화했습니다.',
            files: [],
            screenshots: [],
            startDate: '2023-07-01',
            endDate: '2023-09-01'
        },
        {
            id: 'app-1', type: 'app',
            shortTitle: '이마트 Power Apps 개발', color: '#00b894', icon: 'bx bxs-save',
            bullet1: '프로젝트명: 이마트 Power Apps...', bullet2: '상품권 신청 자동화 시스템',
            title: '이마트 Power Apps 개발', company: '이마트 / 덱스컨설팅', duration: '2024.11 ~ 2024.11 (1개월)',
            role: 'Power Apps 앱 설계 및 개발, DB 구성, Power Automate 설계/개발, Forms 연동', tech: ['Power Apps', 'Power Automate', 'Forms', 'Outlook', 'SharePoint'],
            achievements: '고객사별 상품권 판매 신청 관리 및 안내 메일 발송 자동화로 업무 시간 40% 단축.',
            desc: 'Microsoft Forms와 Power Apps를 연동하여 상품권 구매 신청, 판매 데이터, 현황 데이터를 실시간 통합 관리하는 앱을 개발했습니다. 자동 알림 시스템으로 재고 관리 효율성을 높여 지급 누락을 방지하고 관리자의 업무 부담을 대폭 감소시켰습니다.',
            files: [],
            screenshots: [],
            startDate: '2024-11-01',
            endDate: '2024-11-01'
        },
        {
            id: 'app-2', type: 'app',
            shortTitle: '포스코이앤씨 Power Apps 개발', color: '#00b894', icon: 'bx bxs-save',
            bullet1: '프로젝트명: 포스코이앤씨...', bullet2: '협력사 라이선스 관리 앱 개발',
            title: '포스코이앤씨 라이선스 통합 관리 앱', company: '포스코이앤씨 / 덱스컨설팅', duration: '2023.11 ~ 2024.01 (3개월)',
            role: '프로젝트 PL, 앱 설계 및 개발, DB 구성, Azure AD 그룹 개발, 교육', tech: ['Power Apps', 'Power Automate', 'Azure AD', 'Teams', 'SharePoint'],
            achievements: '협력사 라이선스 관리 시간 75% 단축, 잉여 협력사 라이선스 회수율 70% 증가.',
            desc: '기존 3개 프로그램으로 관리되던 협력사 계정 및 라이선스를 Power Apps 하나로 통합했습니다. 협력사 계정 리스트(CRUD) 관리가 가능한 앱을 개발하고, 기초부터 운영 단계까지 고객사 사용자를 위한 메인 강사로 교육을 진행했습니다.',
            files: [],
            screenshots: [],
            startDate: '2023-11-01',
            endDate: '2024-01-01'
        },
        {
            id: 'app-3', type: 'app',
            shortTitle: '덱스컨설팅 통합 관리 플랫폼 운영', color: '#00b894', icon: 'bx bxs-save',
            bullet1: '프로젝트명: 통합 운영...', bullet2: '10+ 앱 안정적 운영',
            title: '덱스컨설팅 통합 관리 플랫폼 운영', company: '덱스컨설팅', duration: '2024.01 ~ 2024.10 (10개월)',
            role: '앱 시스템 운영 및 유지보수, 사용자 요청사항 반영', tech: ['Power Apps', 'Power Automate', 'SharePoint', 'Dataverse', 'Teams'],
            achievements: '10개 이상 전체 관리 앱 시스템의 안정적 운영 및 지속적 기능 개선.',
            desc: '출퇴근 관리, 게시판, 회의실 예약, 인력 관리, 휴가 신청, 프로젝트 관리 등 다양한 업무 영역의 Power Apps 기반 시스템을 총괄 운영하며, 모든 시스템을 하나의 인터페이스로 관리하는 플랫폼을 구축하여 전사 업무 효율을 향상시켰습니다.',
            files: [],
            screenshots: [],
            startDate: '2024-01-02',
            endDate: '2024-10-01'
        },
        {
            id: 'app-4', type: 'app',
            shortTitle: '덱스컨설팅 프로젝트 관리 시스템', color: '#00b894', icon: 'bx bxs-save',
            bullet1: '프로젝트명: 프로젝트 관리...', bullet2: '프로젝트 인력 배정 자동화',
            title: '덱스컨설팅 프로젝트 현황 및 관리 시스템', company: '덱스컨설팅', duration: '2023.05 ~ 2023.07 (3개월)',
            role: '앱 설계 및 개발, DB 구성, Power Automate 설계', tech: ['Power Apps', 'Power Automate', 'SharePoint', 'Dataverse'],
            achievements: '인사팀의 수작업 기반 프로젝트 데이터 관리 프로세스 통합.',
            desc: '전사 프로젝트 진행 현황을 실시간으로 관리하고, 진행 인원의 현황을 파악할 수 있는 시스템을 구축했습니다. 이를 통해 자동화되고 효율적인 인력 배정이 가능해졌습니다.',
            files: [],
            screenshots: [],
            startDate: '2023-05-01',
            endDate: '2023-07-01'
        },
        {
            id: 'app-5', type: 'app',
            shortTitle: '덱스컨설팅 인력 역량 관리 시스템', color: '#00b894', icon: 'bx bxs-save',
            bullet1: '프로젝트명: 역량 관리...', bullet2: '직원 프로필 및 자격증 알림',
            title: '덱스컨설팅 인력 및 역량 통합 관리 시스템', company: '덱스컨설팅', duration: '2023.04 ~ 2023.05 (2개월)',
            role: '앱 설계 및 개발, DB 구성', tech: ['Power Apps', 'Power Automate', 'SharePoint', 'Dataverse'],
            achievements: '전 직원 데이터 통합 및 효율적인 개인 성과 관리 구축.',
            desc: '직원의 역량, 프로필, 자격증 정보를 체계적으로 관리하는 시스템입니다. 자격증 만료 알림 및 프로필 최신화 요청 알림 기능을 구현하여 관리 누락을 완전히 방지했습니다.',
            files: [],
            startDate: '2023-04-01',
            endDate: '2023-05-01'
        }
    ];

    // --- Dynamic Rendering & Filters ---
    let currentFilter = 'All'; // 'All', 'rpa', 'app'
    let currentSort = 'date-desc'; // 'date-asc', 'date-desc', 'asc', 'desc'
    let searchQuery = '';

    const projectGrid = document.getElementById('project-grid');

    const renderProjects = () => {
        if (!projectGrid) return;

        // Stabilize height to prevent screen jump
        projectGrid.style.minHeight = projectGrid.offsetHeight + 'px';
        projectGrid.innerHTML = ''; // Clear existing

        // Filter
        let filtered = projectsData.filter(p => {
            if (currentFilter !== 'All' && p.type !== currentFilter) return false;

            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                if (!p.title.toLowerCase().includes(q) &&
                    !p.bullet1.toLowerCase().includes(q) &&
                    !p.bullet2.toLowerCase().includes(q) &&
                    !p.shortTitle.toLowerCase().includes(q)) {
                    return false;
                }
            }
            return true;
        });

        // Sort (날짜순 / 이름순)
        filtered.sort((a, b) => {
            if (currentSort === 'date-desc') {
                return new Date(b.endDate) - new Date(a.endDate);
            } else if (currentSort === 'date-asc') {
                return new Date(a.endDate) - new Date(b.endDate);
            } else if (currentSort === 'asc') {
                return a.shortTitle.localeCompare(b.shortTitle, 'ko');
            } else {
                return b.shortTitle.localeCompare(a.shortTitle, 'ko');
            }
        });

        // Render Cards
        filtered.forEach((p, idx) => {
            const delay = idx * 0.05 + 's';
            const card = document.createElement('div');
            card.className = 'notion-card glass-card fade-in-up visible';
            card.style.animationDelay = delay;
            card.onclick = () => openModal(p.id);

            const typeLabel = p.type === 'rpa' ? 'Power Automate' : 'Power Apps';
            const labelColor = p.type === 'rpa' ? '#6c5ce7' : '#00b894';

            card.innerHTML = `
                <div class="notion-card-body">
                    <h3 style="color:${labelColor}; font-size: 0.9rem; margin-bottom: 0.8rem; letter-spacing: 0.5px;">${typeLabel}</h3>
                    <div style="color: var(--text-muted); font-size: 0.85rem; display: flex; align-items: center; gap: 5px; margin-top: 1rem;">
                        <i class='bx bx-calendar'></i> ${p.duration}
                    </div>
                </div>
                <div class="notion-card-footer">
                    <i class='${p.icon}' style="color: ${p.color};"></i> ${p.shortTitle}
                </div>
            `;
            projectGrid.appendChild(card);
        });

        // Reset min-height after content is populated
        requestAnimationFrame(() => {
            projectGrid.style.minHeight = 'auto';
        });
    };

    // --- UI Controls Logic ---
    const btnFilter = document.getElementById('btn-filter');
    const menuFilter = document.getElementById('menu-filter');
    const btnSort = document.getElementById('btn-sort');
    const menuSort = document.getElementById('menu-sort');
    const btnSearch = document.getElementById('btn-search');
    const inputSearch = document.getElementById('input-search');

    // Toggle Dropdowns
    if (btnFilter) {
        btnFilter.onclick = (e) => {
            e.stopPropagation();
            menuSort.classList.add('hidden');
            menuFilter.classList.toggle('hidden');
        };
    }
    if (btnSort) {
        btnSort.onclick = (e) => {
            e.stopPropagation();
            menuFilter.classList.add('hidden');
            menuSort.classList.toggle('hidden');
        };
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        if (menuFilter) menuFilter.classList.add('hidden');
        if (menuSort) menuSort.classList.add('hidden');
    });

    // Handle Filter Clicks
    if (menuFilter) {
        menuFilter.querySelectorAll('.drop-item').forEach(item => {
            item.onclick = (e) => {
                menuFilter.querySelectorAll('.drop-item').forEach(el => el.classList.remove('active'));
                item.classList.add('active');
                currentFilter = item.dataset.filter;
                renderProjects();
            };
        });
    }

    // Handle Sort Clicks
    if (menuSort) {
        menuSort.querySelectorAll('.drop-item').forEach(item => {
            item.onclick = (e) => {
                menuSort.querySelectorAll('.drop-item').forEach(el => el.classList.remove('active'));
                item.classList.add('active');
                currentSort = item.dataset.sort;
                renderProjects();
            };
        });
    }

    // Handle Search Interaction
    if (btnSearch && inputSearch) {
        btnSearch.onclick = () => {
            inputSearch.classList.toggle('active');
            if (inputSearch.classList.contains('active')) {
                inputSearch.focus();
            }
        };

        inputSearch.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderProjects();
        });
    }


    // --- Modal Logic ---
    const modalOverlay = document.getElementById('modal-container');
    const modalBody = document.getElementById('modal-body');

    window.openModal = (id) => {
        const data = projectsData.find(p => p.id === id); // Array find
        if (!data) return;

        const closeBtnHTML = `<button class="modal-close" onclick="closeModal()"><i class='bx bx-x'></i></button>`;

        if (data.customHTML) {
            modalBody.innerHTML = closeBtnHTML + data.customHTML;
        } else {
            const techTags = data.tech.map(t => `<span class="m-tag">${t}</span>`).join('');

            modalBody.innerHTML = `
                ${closeBtnHTML}
                <div class="modal-article">
                    <div class="m-header">
                        <h2 class="m-title">${data.title}</h2>
                        <div class="m-meta">
                            <span><i class='bx bxs-business'></i> ${data.company}</span>
                            <span><i class='bx bx-calendar'></i> ${data.duration}</span>
                        </div>
                    </div>
                    
                    <div class="m-section">
                        <h4><i class='bx bx-check-circle'></i> 주요 성과</h4>
                        <p style="color:var(--text-main); font-weight:600;">${data.achievements}</p>
                    </div>

                    <div class="m-section">
                        <h4><i class='bx bx-file'></i> 상세 설명</h4>
                        <p>${data.desc}</p>
                    </div>
                    
                    <div class="m-section">
                        <h4><i class='bx bx-user-pin'></i> 담당 역할</h4>
                        <p>${data.role}</p>
                    </div>

                    <div class="m-section" style="margin-bottom:0;">
                        <h4><i class='bx bx-code-alt'></i> 기술 스택</h4>
                        <div class="m-tags">${techTags}</div>
                    </div>
                </div>
            `;
        }

        // --- 자동 파일 다운로드 렌더링 로직 ---
        if (data.files && data.files.length > 0) {
            let filesHTML = `<div class="notion-h3"><i class='bx bx-paperclip'></i> 첨부 파일</div>`;
            data.files.forEach(f => {
                // files/프로젝트ID/파일명 경로를 자동 매핑합니다.
                filesHTML += `
                    <a href="files/${data.id}/${f}" download="${f}" class="notion-file-block">
                        <i class='bx bxs-file-blank'></i>
                        <span class="file-name">${f}</span>
                    </a>
                `;
            });
            const article = modalBody.querySelector('.modal-article');
            if (article) article.insertAdjacentHTML('beforeend', filesHTML);
        }

        // --- 이미지 갤러리 렌더링 로직 ---
        if (data.screenshots && data.screenshots.length > 0) {
            const screenshotsHTML = `<div class="notion-h3"><i class='bx bx-image'></i> 갤러리</div>`;
            const galleryGrid = document.createElement('div');
            galleryGrid.className = 'notion-image-gallery';

            data.screenshots.forEach(img => {
                const imgBlock = document.createElement('div');
                imgBlock.className = 'notion-image-block';
                imgBlock.innerHTML = `
                    <img src="${img.url}" alt="${img.caption}">
                    <div class="image-caption">${img.caption}</div>
                `;
                imgBlock.onclick = (e) => {
                    e.stopPropagation();
                    openLightbox(img.url);
                };
                galleryGrid.appendChild(imgBlock);
            });

            const article = modalBody.querySelector('.modal-article');
            if (article) {
                article.insertAdjacentHTML('beforeend', screenshotsHTML);
                article.appendChild(galleryGrid);
            }
        }

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent scrolling behind
    };

    window.closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    // --- Lightbox Element Setup ---
    const lightboxContainer = document.getElementById('lightbox-container');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = lightboxContainer ? lightboxContainer.querySelector('.lightbox-close') : null;

    const openLightbox = (src) => {
        if (!lightboxContainer || !lightboxImg) return;
        lightboxImg.src = src;
        lightboxContainer.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        if (!lightboxContainer) return;
        lightboxContainer.classList.remove('active');
        // 만약 메인 모달이 열려있지 않다면 스크롤 복구 (이미 모달이 열려있으면 hidden 유지)
        if (!modalOverlay.classList.contains('active')) {
            document.body.style.overflow = 'auto';
        }
    };

    if (lightboxClose) lightboxClose.onclick = closeLightbox;

    // --- Keyboard Shortcuts (ESC, Backspace to close) ---
    document.addEventListener('keydown', (e) => {
        // ESC key (Escape) or Backspace key
        if (e.key === 'Escape' || e.key === 'Backspace') {
            // If Lightbox is open, close it first
            if (lightboxContainer && lightboxContainer.classList.contains('active')) {
                closeLightbox();
                e.preventDefault(); // prevent default backspace behavior
            }
            // If Modal is open, close it
            else if (modalOverlay && modalOverlay.classList.contains('active')) {
                closeModal();
                e.preventDefault(); // prevent default backspace behavior
            }
        }
    });

    // --- Scroll Intersection Observer ---
    const initScrollObserver = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        const animElements = document.querySelectorAll('.fade-in-up');
        animElements.forEach(el => observer.observe(el));
    };

});
