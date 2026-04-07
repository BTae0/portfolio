document.addEventListener('DOMContentLoaded', () => {

    // --- 포트폴리오 관리자 설정 (CONFIG) ---
    const CONFIG = {
        IS_LOGIN_GATE_ACTIVE: true,   // true: 로그인 필수, false: 전체 공개
        ADMIN_CODE: 'adminbae',       // 관리자 영구 패스 코드
        BYPASS_QUERY: 'mode',         // 바이패스 URL 쿼리 (예: ?mode=open)
        BYPASS_VALUE: 'open'          // 바이패스 값
    };

    // --- Password Gate Elements ---
    const gateBtn = document.getElementById('gate-submit');
    const gateInput = document.getElementById('gate-password');
    const gateError = document.getElementById('gate-error');
    const gateContainer = document.getElementById('password-gate');
    const mainContent = document.getElementById('main-content');
    const adminControls = document.getElementById('admin-controls');
    const lockBtn = document.getElementById('btn-lock-site');

    // 1. 초기 해제 상태 확인 (Global / URL / LocalStorage)
    const checkUnlockState = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const isBypassUrl = urlParams.get(CONFIG.BYPASS_QUERY) === CONFIG.BYPASS_VALUE;
        const isPreviouslyUnlocked = localStorage.getItem('portfolio_unlocked') === 'true';

        // 전역 설정이 꺼져있거나, 바이패스 주소이거나, 이미 인증된 브라우저인 경우
        if (!CONFIG.IS_LOGIN_GATE_ACTIVE || isBypassUrl || isPreviouslyUnlocked) {
            gateContainer.classList.add('hidden');
            mainContent.classList.remove('hidden');
            
            // 관리자 코드로 인증된 경우에만 하단 관리 버튼 노출
            if (isPreviouslyUnlocked) {
                adminControls.classList.remove('hidden');
            }
            
            initScrollObserver();
            renderProjects();
        }
    };

    // 2. 패스워드 입력 처리
    const unlockPortfolio = () => {
        const password = gateInput.value.trim();
        
        if (password === 'power' || password === CONFIG.ADMIN_CODE) {
            // 관리자 코드일 경우 브라우저에 저장
            if (password === CONFIG.ADMIN_CODE) {
                localStorage.setItem('portfolio_unlocked', 'true');
                adminControls.classList.remove('hidden');
            }

            gateContainer.style.opacity = '0';
            setTimeout(() => {
                gateContainer.classList.add('hidden');
                mainContent.classList.remove('hidden');
                initScrollObserver();
                renderProjects();
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

    if (lockBtn) {
        lockBtn.addEventListener('click', () => {
            localStorage.removeItem('portfolio_unlocked');
            alert('인증 정보가 초기화되었습니다. 다시 로그인 화면이 활성화됩니다.');
            location.reload();
        });
    }

    // --- Data for Modals & Grid ---
    const projectsData = [
        {
            id: 'rpa-0', type: 'rpa',
            shortTitle: '로얄앤컴퍼니 RPA 시스템 구축 및 운영', color: '#6c5ce7', icon: 'bx bxs-institution',
            bullet1: 'RPA 전사 도입 및 거버넌스 수립', bullet2: '15개 프로세스 개발 및 100% 사내 운영',
            title: 'RPA 시스템 인프라 구축 및 전사 확산 리딩', company: '로얄앤컴퍼니', duration: '2025.10 ~ 현재',
            role: 'RPA Lead / Administrator (도입, 개발, 교육, 운영 총괄)', tech: ['Power Automate', 'Teams (Shared Channels)', 'OneDrive', 'SQL (ERP 연동)', 'M365 Admin'],
            achievements: '사내 최초 RPA 도입 후 전 부서 확산 완료. 15개 과제 운영 및 전사 교육 실시.',
            desc: '로얄앤컴퍼니 최초의 RPA 담당자로 합류하여, RPA 인프라 구축부터 전사 프로젝트 발굴, 교육 및 운영까지 전 과정을 리딩하며 사내 디지털 전환(DX) 문화를 정착시켰습니다.',
            customHTML: `
            <div class="modal-article" style="padding: 1.5rem;">
                <div class="notion-h2">로얄앤컴퍼니 RPA 시스템 구축 및 전사 확산 리딩</div>
                
                <!-- 상단 핵심 성과 지표 -->
                <div class="notion-metrics-grid">
                    <div class="metric-card">
                        <span class="metric-value">From Zero</span>
                        <span class="metric-label">사내 최초 RPA 도입/구축</span>
                    </div>
                    <div class="metric-card">
                        <span class="metric-value">15개+</span>
                        <span class="metric-label">자동화 프로세스 운영 중</span>
                    </div>
                    <div class="metric-card">
                        <span class="metric-value">전 부서</span>
                        <span class="metric-label">사내 교육 및 컨설팅 완료</span>
                    </div>
                </div>

                <table class="notion-props-table">
                    <tr>
                        <td class="prop-label"><i class='bx bx-calendar'></i> Date</td>
                        <td class="prop-value">2025.10 ~ 현재 (재직 중)</td>
                    </tr>
                    <tr>
                        <td class="prop-label"><i class='bx bxs-tag-alt'></i> Tags</td>
                        <td class="prop-value">
                            <span class="m-tag" style="background: rgba(131, 56, 236, 0.2); color: #cba6f7;">Power Automate</span>
                            <span class="m-tag">Teams</span>
                            <span class="m-tag">OneDrive</span>
                            <span class="m-tag" style="background: rgba(225, 112, 85, 0.2); color: #fab1a0;">SQL (ERP)</span>
                            <span class="m-tag">Security Admin</span>
                        </td>
                    </tr>
                </table>

                <div class="notion-h3">1. 프로젝트 개요 & 리더십</div>
                <div class="notion-callout">
                    <i class='bx bxs-bolt-circle' style="color: #feca57;"></i>
                    <div class="notion-callout-text">
                        <strong>"RPA 도입 전무 상태에서 DX 문화 정착까지"</strong><br>
                        로얄앤컴퍼니 입사 후, 수작업 위주의 비효율적인 업무 환경을 개선하기 위해 독자적으로 RPA 인프라를 설계하고 구축했습니다. 현재는 15개 이상의 과제를 성공적으로 안착시키며 전사적인 생산성 향상을 주도하고 있습니다.
                    </div>
                </div>

                <div class="notion-h3">2. 주요 성과 및 거버넌스 수립</div>
                <div class="notion-emoji-title">💬 Teams 기반의 실시간 협업 체계 구축</div>
                <ul class="notion-ul">
                    <li><strong>공유 채널 활용</strong>: RPA 프로세스별 Teams 전용 채널을 구축하여 담당자와 1:1 실시간 소통 및 피드백 루프 생성</li>
                    <li><strong>문서 중앙 관리</strong>: OneDrive를 활용해 모든 템플릿, 결과 로그, 개발 문서를 중앙화하여 보안과 효율 동시 확보</li>
                </ul>

                <div class="notion-emoji-title">🎓 전사적 DX 교육 및 컨설팅 리딩</div>
                <ul class="notion-ul">
                    <li><strong>교육 프로그램 운영</strong>: 전 부서를 대상으로 RPA 활용 교육을 직접 설계하고 진행하여 Citizen Developer 환경 조성</li>
                    <li><strong>맞춤형 컨설팅</strong>: 각 팀의 페인포인트를 분석하여 15개 이상의 맞춤형 과제를 발굴 및 성공적인 실 상문화</li>
                </ul>

                <div class="notion-h3">3. 기술력 및 관리 역량</div>
                <ul class="notion-ul">
                    <li><strong>ERP 통합</strong>: 사내 ERP 시스템과 SQL을 연동하여 데이터 정합성 보장 및 고도화된 자동화 리포팅 구현</li>
                    <li><strong>종합 보안 관리</strong>: RPA 운영뿐만 아니라 사용자 계정 관리 및 전사 보안 정책 수립/관리 병행</li>
                    <li><strong>통합 모니터링</strong>: 15개 프로세스의 에러 핸들링 및 실시간 모니터링 시스템 구축</li>
                </ul>

                <div class="notion-h3">4. 담당 역할 및 책임</div>
                <div class="notion-table-wrap">
                    <table class="notion-table">
                        <thead>
                            <tr>
                                <th>영역</th>
                                <th>구체적인 활동</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>전략 수립</td><td>RPA 도입 로드맵 설계 및 기대 성과(ROI) 분석</td></tr>
                            <tr><td>개발/운영</td><td>Power Automate 기반 15개 과제 핵심 로직 설계 및 유지보수</td></tr>
                            <tr><td>데이터 관리</td><td>사내 ERP SQL 쿼리 최적화 및 DB 연동 자동화</td></tr>
                            <tr><td>보안/행정</td><td>M365 사용자 계정 관리 및 사내 정보 보안 관리</td></tr>
                        </tbody>
                    </table>
                </div>

                <div class="notion-check-title"><i class='bx bxs-check-circle'></i> 결론 및 회고</div>
                <div class="notion-quote">
                    단순한 개발자가 아닌, 한 기업의 기술 스택을 선택하고 문화를 만들어가는 **RPA Lead**로서의 역량을 발휘했습니다. 수작업이 당연시되던 환경에서 '자동화가 필수인 문화'로 변화시킨 점이 가장 큰 자산입니다.
                </div>
            </div>
            `,
            files: [],
            screenshots: [],
            startDate: '2025-10-01',
            endDate: '2026-12-31'
        },
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
            shortTitle: 'GS Retail 담배소매인 고시공고 자동 수집 RPA', color: '#6c5ce7', icon: 'bx bxs-save',
            bullet1: '프로젝트명: GS Retail...', bullet2: '담배 고시공고 데이터 수집 (90% 단축)',
            title: 'GS리테일 담배소매인 고시공고 자동 수집 RPA', company: 'GS리테일 / 덱스컨설팅', duration: '2023.07 ~ 2023.09 (2개월)',
            role: 'RPA 프로세스 개발, Web 크롤링 로직 설계', tech: ['Power Automate Desktop', 'VBScript', 'Web 크롤링', 'SQL', 'HTML', 'Outlook'],
            achievements: '담배 고시/공고 데이터 수집 시간 90% 단축 달성.',
            desc: '전국 250여 개 지자체 사이트에 분산된 담배소매인 지정 고시/공고 데이터를 자동으로 수집, 정제하여 담당 팀별로 알림을 발송하는 시스템을 구축했습니다. 지자체별 상이한 웹 구조를 극복하기 위해 계층형 검색 엔진 아키텍처를 도입했습니다.',
            customHTML: `
            <div class="modal-article" style="padding: 1.5rem;">
                <div class="notion-h2">GS Retail 담배소매인 지정 고시공고 자동 수집 RPA</div>
                
                <!-- 상단 핵심 성과 지표 -->
                <div class="notion-metrics-grid">
                    <div class="metric-card">
                        <span class="metric-value">90%</span>
                        <span class="metric-label">수집 및 정제 시간 단축</span>
                    </div>
                    <div class="metric-card">
                        <span class="metric-value">30명</span>
                        <span class="metric-label">시스템 실 사용자 수</span>
                    </div>
                    <div class="metric-card">
                        <span class="metric-value">250+</span>
                        <span class="metric-label">모니터링 지자체 수</span>
                    </div>
                </div>

                <table class="notion-props-table">
                    <tr>
                        <td class="prop-label"><i class='bx bx-calendar'></i> Date</td>
                        <td class="prop-value">2023.07~2023.09</td>
                    </tr>
                    <tr>
                        <td class="prop-label"><i class='bx bxs-tag-alt'></i> Tags</td>
                        <td class="prop-value">
                            <span class="m-tag" style="background: rgba(131, 56, 236, 0.2); color: #cba6f7;">Power Automate Desktop</span>
                            <span class="m-tag">Web 크롤링</span>
                            <span class="m-tag">VBScript</span>
                            <span class="m-tag" style="background: rgba(255, 107, 129, 0.2); color: #ff6b81;">SQL</span>
                            <span class="m-tag">Excel</span>
                            <span class="m-tag">Outlook</span>
                        </td>
                    </tr>
                </table>

                <div class="notion-h3">1. 프로젝트 개요</div>
                <div class="notion-callout">
                    <i class='bx bxs-info-circle'></i>
                    <div class="notion-callout-text">
                        GS리테일의 전국 250여 개 지자체 사이트에 분산된 담배소매인 지정 고시/공고 데이터를 자동으로 수집, 정제하여 담당 팀별로 알림을 발송하는 RPA 시스템을 구축했습니다.
                    </div>
                </div>

                <div class="notion-h3">2. 요구사항 및 역할</div>
                <div class="notion-emoji-title">💼 주요 요구사항</div>
                <ul class="notion-ul">
                    <li>전국 지자체 사이트 내 담배 고시/공고 파일 자동 다운로드 및 데이터 추출</li>
                    <li>소매인 폐업, 신규 모집, 행정처분 등 특정 키워드 기반 데이터 필터링 및 활용</li>
                    <li>수집된 데이터를 정제하여 담당 팀별 맞춤형 Excel 보고서 생성 및 Outlook 발송</li>
                    <li>지자체별 상이한 웹 페이지 구조에 대응하는 유연한 크롤링 엔진 요구</li>
                </ul>

                <div class="notion-emoji-title">👨‍💻 담당 역할 (RPA Developer)</div>
                <ul class="notion-ul">
                    <li>3, 4부문 소속 팀별 맞춤형 담배소매인 고시 공고 알림 프로세스 설계 및 개발</li>
                    <li>Power Automate Desktop 및 JavaScript를 활용한 하이브리드 웹 크롤링 로직 구현</li>
                    <li>개발 완료 후 현업 운영 담당자 대상 로직 인수인계 및 운영 가이드 제공</li>
                </ul>

                <div class="notion-h3">3. 주요 핵심 기술</div>
                <ul class="notion-ul">
                    <li><strong>JavaScript 하이브리드 크롤링</strong>: 브라우저 액션만으로 대응 불가능한 복잡한 DOM 구조를 JavaScript 주입을 통해 안정적으로 데이터 추출</li>
                    <li><strong>SQL & VBScript Excel 제어</strong>: 수천 건의 로우 데이터를 SQL 쿼리 방식으로 처리하고, VBScript를 통해 엑셀 포맷팅 및 데이터 정제를 비약적으로 가속화</li>
                    <li><strong>HTML 동적 메일 템플릿</strong>: Power Automate 내에서 데이터 가공 후, 현업 요구에 맞춘 표(Table) 형식의 HTML 메일을 실시간 생성 및 발송</li>
                </ul>

                <div class="notion-h3">4. 아키텍처 및 주요 시스템</div>
                <div class="notion-table-wrap">
                    <table class="notion-table">
                        <thead>
                            <tr>
                                <th>과제 구분</th>
                                <th>수행 주기</th>
                                <th>업무 상세 및 자동화 범위</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>3부문 개별 프로세스</td><td>일(Daily)</td><td>소속 팀별 RFC 담배소매인 지정 고시 데이터를 수집 및 정제 후 개별 파일 생성</td></tr>
                            <tr><td>4부문 개별 프로세스</td><td>일(Daily)</td><td>소속 팀별 RFC 담배소매인 지정 고시 데이터를 수집 및 정제 후 개별 파일 생성</td></tr>
                            <tr><td>통합 실행 및 메일 발송</td><td>일(Daily)</td><td>3, 4부문 전체 흐름을 통합 실행하고, 최종 결과를 담당자에게 메일로 자동 리포팅</td></tr>
                        </tbody>
                    </table>
                </div>

                <div class="notion-h3">5. 문제 해결 및 기술적 도전</div>
                <div class="notion-check-title"><i class='bx bx-check-shield'></i> 문제 사례 1: 지자체별 상이한 웹 사이트 구성</div>
                <div class="notion-quote">
                    <strong>현상</strong>: 전국 지자체마다 고시/공고 페이지 접근 방식이 다르고, 일부 지자체는 아예 해당 페이지가 없는 '데이터 고립' 현상 발생.<br>
                    <strong>해결</strong>: 특정 지자체(예: 성동구)에 공고가 없을 경우, 상위 기관(예: 서울시) 사이트에서 해당 지자체 키워드로 검색하여 파일을 확보하는 '계층형 검색 엔진' 아키텍처를 도입하여 데이터 수집 커버리지를 100%로 확보했습니다.
                </div>

                <br>
                <div class="notion-check-title"><i class='bx bx-envelope'></i> 문제 사례 2: 복잡한 표 형식의 메일 발송 요구</div>
                <div class="notion-quote" style="border-left-color: #ff7675;">
                    <strong>현상</strong>: 단순 텍스트 메일이 아닌, 수집된 결과를 즉시 파악할 수 있는 정교한 표(Table) 형태의 Outlook 본문 구성 요청.<br>
                    <strong>해결</strong>: Power Automate의 내부 변수와 'HTML 테이블 만들기' 액션을 커스텀 CSS와 결합하여, 동적으로 변화하는 데이터 개수에 맞춰 자동으로 행이 늘어나는 반응형 HTML 템플릿을 개발하여 시인성을 극대화했습니다.
                </div>

                <div class="notion-h3">6. 개발 결과 및 프로젝트 성과</div>
                <ul class="notion-ul">
                    <li><strong>비약적인 효율 개선</strong>: 수동 작업 시 일 8시간 소요되던 프로세스를 30분 내외로 단축하여 **약 90%의 업무 효율 향상** 달성.</li>
                    <li><strong>사용자 피드백</strong>: 현업 담당자로부터 "RPA가 가장 필요한 업무에 최적으로 적용된 사례"라는 긍정적 피드백 수취.</li>
                    <li><strong>운영 안정성</strong>: 많은 사이트 접속 시 발생하는 Chrome 브라우저 과부하 문제를 로직 중간 강제 종료 및 캐시 삭제 프로세스를 통해 시스템 가용성 확보.</li>
                </ul>

                <div class="notion-check-title"><i class='bx bxs-check-circle'></i> 프로젝트 회고</div>
                <div class="notion-quote">
                    메일링 업무에 HTML을 직접 활용함으로써 현업의 가상화(Presentation) 요구사항을 완벽히 충족시킬 수 있는 역량을 확보했으며, 복잡한 웹 환경에서도 API와 스크립트를 적절히 혼합하여 안정적인 자동화를 구축하는 노하우를 습득했습니다.
                </div>
            </div>
            `,
            files: [
                'GS리테일 담배소매인 고시공고 프로세스 정의서.pptx',
                '20231108_1지역 개발팀_결과파일.xlsx',
                '20231108_2지역 개발팀_결과파일.xlsx',
                '20231108_4지역 광역_결과파일.xlsx'
            ],
            screenshots: [],
            startDate: '2023-07-01',
            endDate: '2023-09-01'
        },
        {
            id: 'rpa-3', type: 'rpa',
            shortTitle: '게스코리아 2차 RPA 시스템 구축 및 기업교육', color: '#6c5ce7', icon: 'bx bxs-save',
            bullet1: '프로젝트명: 게스코리아...', bullet2: 'HR 근태 관리 자동화 (80% 단축)',
            title: '게스코리아 2차 RPA 시스템 구축 및 기업교육', company: '게스코리아 / 덱스컨설팅', duration: '2023.07 ~ 2023.09 (2개월)',
            role: 'RPA 프로세스 설계 및 개발, 기업 교육 강사', tech: ['Power Automate Desktop', 'Shiftee 연동', 'SQL', 'VBScript', 'Outlook', 'Excel'],
            achievements: '근무 일정 관리 및 미준수자 선별 업무 시간 80% 단축.',
            desc: '게스코리아 HR팀의 근태 관리 효율성을 높이기 위해, Shiftee 시스템 데이터를 기반으로 한 5개의 자동화 프로세스를 구축하고 현업 담당자 대상 RPA 실무 교육을 병행했습니다.',
            customHTML: `
            <div class="modal-article" style="padding: 1.5rem;">
                <div class="notion-h2">게스코리아 2차 RPA 시스템 구축 및 기업교육</div>
                
                <!-- 상단 핵심 성과 지표 -->
                <div class="notion-metrics-grid">
                    <div class="metric-card">
                        <span class="metric-value">80%</span>
                        <span class="metric-label">근무 타입 미준수자 선별 시간 단축</span>
                    </div>
                    <div class="metric-card">
                        <span class="metric-value">5개</span>
                        <span class="metric-label">HR 영역 자동화 과제</span>
                    </div>
                    <div class="metric-card">
                        <span class="metric-value">100%</span>
                        <span class="metric-label">교육 수료 및 운영 이관율</span>
                    </div>
                </div>

                <table class="notion-props-table">
                    <tr>
                        <td class="prop-label"><i class='bx bx-calendar'></i> Date</td>
                        <td class="prop-value">2023.07~2023.09</td>
                    </tr>
                    <tr>
                        <td class="prop-label"><i class='bx bxs-tag-alt'></i> Tags</td>
                        <td class="prop-value">
                            <span class="m-tag" style="background: rgba(131, 56, 236, 0.2); color: #cba6f7;">Power Automate Desktop</span>
                            <span class="m-tag">Shiftee 연동</span>
                            <span class="m-tag">Excel/SQL</span>
                            <span class="m-tag" style="background: rgba(255, 107, 129, 0.2); color: #ff6b81;">VBScript</span>
                            <span class="m-tag">HR 자동화</span>
                            <span class="m-tag">기업 교육</span>
                        </td>
                    </tr>
                </table>

                <div class="notion-h3">1. 프로젝트 개요</div>
                <div class="notion-callout">
                    <i class='bx bxs-info-circle'></i>
                    <div class="notion-callout-text">
                        게스코리아 HR팀의 근태 관리 효율성을 높이기 위해, Shiftee 시스템 데이터를 기반으로 한 5개의 자동화 프로세스를 구축하고 현업 담당자 대상 RPA 실무 교육을 병행했습니다.
                    </div>
                </div>

                <div class="notion-h3">2. 요구사항 및 역할</div>
                <div class="notion-emoji-title">💼 주요 요구사항</div>
                <ul class="notion-ul">
                    <li>Shiftee(시프티) 월 마감 및 근무일정 확인 메일 자동 발송 (5개 영역)</li>
                    <li>사용자 유형(STM-1, STM-2 등) 및 근무 타입별 정교한 필터링 로직 구현</li>
                    <li>조퇴자 및 근무일정 오류 가공 및 결과 리포팅</li>
                    <li>Microsoft Power Automate 이론 및 실무 운영을 위한 기업 교육 진행</li>
                </ul>

                <div class="notion-emoji-title">👨‍💻 담당 역할 (RPA Developer / Educator)</div>
                <ul class="notion-ul">
                    <li>STM-1, STM-2 사용자 근무일정 확인 및 조퇴자 확인 프로세스 설계 및 개발</li>
                    <li>Shiftee 엑셀 데이터 추출 및 SQL 기반 데이터 정제 로직 총괄</li>
                    <li>Power Automate 교육 커리큘럼 보조 및 실습 강사 수행</li>
                </ul>

                <div class="notion-h3">3. 주요 핵심 기술</div>
                <ul class="notion-ul">
                    <li><strong>Shiftee 데이터 표준화</strong>: 시스템 다운로드 파일의 날짜/시간 포맷 불일치 문제를 해결하기 위해 통합 템플릿 기반 전처리 로직 개발</li>
                    <li><strong>SQL & VBScript 활용</strong>: 복잡한 근태 규칙(코어타임 준수, 30분 단위 근무 등)을 SQL 쿼리로 검증하고 VBScript로 결과값 도출</li>
                    <li><strong>예외 대상자 필터링</strong>: 임원진 및 휴직자 등 특정 제외 대상을 관리자 수동 파일과 동적으로 매핑하여 오발송 0% 달성</li>
                </ul>

                <div class="notion-h3">4. 주요 과제 및 시스템</div>
                <div class="notion-table-wrap">
                    <table class="notion-table">
                        <thead>
                            <tr>
                                <th>과제명</th>
                                <th>수행 주기</th>
                                <th>자동화 범위 및 주요 내용</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>STM-1 근무 확인</td><td>주/월</td><td>사용자 Type 및 재택근무 시간 준수 여부 검증 후 메일 발송</td></tr>
                            <tr><td>STM-2 근무 확인</td><td>주/월</td><td>코어타임 준수(30분 단위) 및 재택 근무 시간 검증 후 메일 발송</td></tr>
                            <tr><td>조퇴 및 오류 확인</td><td>주/월</td><td>조퇴 유형 확인 및 근무일정 입력 오류 데이터 선별 및 알림</td></tr>
                        </tbody>
                    </table>
                </div>

                <div class="notion-h3">5. 문제 해결 및 기술적 도전</div>
                <div class="notion-check-title"><i class='bx bx-check-shield'></i> 문제 사례 1: 데이터 포맷 불일치 (Shiftee)</div>
                <div class="notion-quote">
                    <strong>현상</strong>: Shiftee 시스템에서 내려받은 원본 파일의 날짜 및 시간 데이터 형식이 일관되지 않아 정산 결과에 불일치 발생.<br>
                    <strong>해결</strong>: 모든 추출 파일을 하나의 '마스터 템플릿'으로 통합 연동한 뒤, 정규화 스크립트를 통해 데이터를 표준화하는 전처리 단계를 추가하여 정확도를 100%로 끌어올렸습니다.
                </div>

                <br>
                <div class="notion-check-title"><i class='bx bxs-user-x'></i> 문제 사례 2: 예외 대상(임원진/휴직자) 선별 기준 부재</div>
                <div class="notion-quote" style="border-left-color: #ff7675;">
                    <strong>현상</strong>: 근무 타입이 적용되지 않는 임원진 및 육아휴직자가 지속적으로 위반자로 분류되어 업무 혼선 발생.<br>
                    <strong>해결</strong>: 시스템 데이터에 없는 예외 정보를 '별도 관리자 제외자 파일'과 실시간 Join 연동하는 로직을 구축하여, 명확한 기준 없이 선별되지 않던 대상자들을 완벽히 구분해냈습니다.
                </div>

                <div class="notion-h3">6. 개발 결과 및 프로젝트 성과</div>
                <ul class="notion-ul">
                    <li><strong>업무 시간 대폭 절감</strong>: 수작업으로 진행되던 미준수자 선별 및 메일링 업무 시간을 **기존 대비 80% 단축**.</li>
                    <li><strong>사용자 피드백</strong>: "체계적인 자동화로 보고서 작성이 훨씬 편해졌다"는 긍정적인 평가 획득.</li>
                    <li><strong>성공적인 지식 전수</strong>: RPA 이론 및 실무 교육을 통해 현업 담당자들이 기초적인 유지보수를 직접 수행할 수 있는 역량 확보.</li>
                </ul>

                <div class="notion-check-title"><i class='bx bxs-graduation'></i> 프로젝트 회고</div>
                <div class="notion-quote">
                    프로젝트 초기부터 권한 시스템 및 데이터 예외 케이스를 미리 파악하는 것이 프로젝트 일정에 얼마나 큰 영향을 주는지 깊이 체감했으며, 향후에는 이를 사전 체크리스트로 정형화하여 대응할 예정입니다.
                </div>
            </div>
            `,
            files: [
                'GUESS 2차 RPA 시스템 구축 완료보고.pdf',
                'Guesskorea_HR05_STM-1 사용자 근무일정 확인_운영 매뉴얼.pptx',
                'Guesskorea_HR06_STM-2 사용자 근무일정 확인_운영 매뉴얼.pptx',
                'Guesskorea_HR07_TGIF 근무일정 확인_운영 매뉴얼_v0.1.pptx'
            ],
            screenshots: [],
            startDate: '2023-07-01',
            endDate: '2023-09-01'
        },
        {
            id: 'app-1', type: 'app',
            shortTitle: '이마트 Power Apps 개발', color: '#00b894', icon: 'bx bxs-save',
            bullet1: '프로젝트명: 이마트 Power Apps...', bullet2: '상품권 신청 자동화 시스템',
            title: '이마트 Power Apps 개발', company: '이마트 / 덱스컨설팅', duration: '2023.11 ~ 2024.01 (3개월)',
            role: 'Power Apps 앱 설계 및 개발, DB 구성, Power Automate 설계/개발, Forms 연동', tech: ['Power Apps', 'Power Automate', 'Forms', 'Outlook', 'SharePoint'],
            achievements: '고객사별 상품권 판매 신청 관리 및 안내 메일 발송 자동화로 업무 시간 40% 단축.',
            desc: 'Microsoft Forms와 Power Apps를 연동하여 상품권 구매 신청, 판매 데이터, 현황 데이터를 실시간 통합 관리하는 앱을 개발했습니다. 자동 알림 시스템으로 재고 관리 효율성을 높여 지급 누락을 방지하고 관리자의 업무 부담을 대폭 감소시켰습니다.',
            customHTML: `
            <div class="modal-article" style="padding: 1.5rem;">
                <div class="notion-h2">이마트 Power Apps 개발</div>

                <!-- 상단 핵심 성과 지표 -->
                <div class="notion-metrics-grid">
                    <div class="metric-card">
                        <span class="metric-value">40%</span>
                        <span class="metric-label">업무 시간 단축</span>
                    </div>
                    <div class="metric-card">
                        <span class="metric-value">5 → 1</span>
                        <span class="metric-label">시스템 단일화</span>
                    </div>
                    <div class="metric-card">
                        <span class="metric-value">100%</span>
                        <span class="metric-label">연동 자동화 달성</span>
                    </div>
                </div>
                
                <table class="notion-props-table">
                    <tr>
                        <td class="prop-label"><i class='bx bx-calendar'></i> Date</td>
                        <td class="prop-value">2023.11~2024.01</td>
                    </tr>
                    <tr>
                        <td class="prop-label"><i class='bx bxs-tag-alt'></i> Tags</td>
                        <td class="prop-value">
                            <span class="m-tag">Forms</span>
                            <span class="m-tag">Outlook</span>
                            <span class="m-tag">Power Apps</span>
                            <span class="m-tag" style="background: rgba(131, 56, 236, 0.2); color: #cba6f7;">Power Automate</span>
                            <span class="m-tag" style="background: rgba(225, 112, 85, 0.2); color: #fab1a0;">SharePoint</span>
                            <span class="m-tag" style="background: rgba(253, 121, 168, 0.2); color: #fd79a8;">Teams</span>
                        </td>
                    </tr>
                </table>

                <div class="notion-h3">1. 프로젝트 개요</div>
                <div class="notion-callout">
                    <i class='bx bxs-info-circle'></i>
                    <div class="notion-callout-text">
                        이마트 고객사(포스코이앤씨 소속 협력사)의 원활한 Microsoft 라이선스 및 상품권 구매 관리를 위해, Forms와 Power Apps, Power Automate를 연동하여 신청 접수부터 승인/반려, 자동 메일 발송까지 모든 과정을 통합하는 자동화 환경을 구축했습니다.
                    </div>
                </div>

                <div class="notion-h3">2. 요구사항 및 역할</div>
                <div class="notion-emoji-title">👨‍💻 담당 역할 : Project Leader</div>
                <ul class="notion-ul">
                    <li>프로젝트 PL로서 커뮤니케이션(Teams, Outlook, OneNote) 및 데일리 스크럼 리딩</li>
                    <li>SharePoint List 구조 설계 및 MS Forms 연동</li>
                    <li>Power Apps 기반의 승인/반려 UI 구현 및 전체 시스템 설계</li>
                    <li>Power Automate를 활용한 로직(알림 메일 발송) 자동화</li>
                </ul>

                <div class="notion-emoji-title">📌 시스템 요구사항</div>
                <ul class="notion-ul">
                    <li>고객사에서 Forms로 제출한 구매 신청서를 Power Apps에 동기화</li>
                    <li>담당자가 손쉽게 신청서를 승인/반려할 수 있는 관리 인터페이스 제공</li>
                    <li>상품권 종류별 선택 기능 및 금액 입력 내역 조회 지원</li>
                    <li>승인/반려 결과, 상품권 스펙, 결제 요청 및 누락 방지 알림 등에 대한 자동 메일 발송</li>
                </ul>

                <div class="notion-h3">3. 기술 및 주요 시스템</div>
                <div class="notion-table-wrap">
                    <table class="notion-table">
                        <thead>
                            <tr>
                                <th>시스템</th>
                                <th>설명 및 활용 방안</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>MS Forms</td>
                                <td>신청자가 구매할 상품권 타입, 가격 등을 입력 → SharePoint 대상 List에 저장</td>
                            </tr>
                            <tr>
                                <td>Power Apps</td>
                                <td>신청 데이터를 기반으로 승인/반려 처리 후 결재일 지정/가격 입력 데이터 관리</td>
                            </tr>
                            <tr>
                                <td>Power Automate</td>
                                <td>승인/반려 결과, 누락 예방, 결재 요청 내용 및 파일 첨부를 포함한 알람 메일 발송</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="notion-h3">4. 문제 해결 및 기술적 도전</div>
                <div class="notion-check-title"><i class='bx bx-git-merge'></i> 시스템 최적화: 5개의 앱을 단일 앱으로 통합</div>
                
                <div class="before-after-grid">
                    <div class="ba-item">
                        <span class="ba-label before">Before</span>
                        <div class="ba-value">상품권별 독립 앱(5개)</div>
                    </div>
                    <div class="ba-arrow"><i class='bx bx-right-arrow-alt'></i></div>
                    <div class="ba-item">
                        <span class="ba-label after">After</span>
                        <div class="ba-value" style="color: #55efc4;">일괄 처리 단일 앱(1개)</div>
                    </div>
                </div>

                <div class="notion-quote">
                    기존에는 상품권 종류별로 담당자가 다를 것이라 판단하여 5개의 개별 앱 개발을 요구받았습니다. 그러나 실제 분석 결과 한 명의 담당자가 여러 시스템을 오가며 개별 처리하는 구조적 지연이 발생함을 파악했습니다. 이에 5개의 독립된 시스템을 하나로 통합하고 다건의 상품권 데이터를 일괄적으로 로직 처리할 수 있도록 아키텍처를 전면 개편했습니다.
                </div>

                <div class="notion-h3">5. 프로젝트 결과 및 회고</div>
                <div class="notion-check-title"><i class='bx bxs-bar-chart-alt-2'></i> 프로젝트 성과</div>
                <ul class="notion-ul">
                    <li><strong>피드백 및 사용</strong>: 원활한 접수/승인 워크플로우를 제공해 약 10명의 관리자가 적극 사용하며 긍정적인 평가 획득</li>
                    <li><strong>데이터 처리량 단축</strong>: 고객사별 판매/신청 프로세스와 안내 메일 발송을 완전 자동화하여 실무 소요 시간 40% 이상 절감</li>
                </ul>

                <div class="notion-check-title"><i class='bx bxs-bulb'></i> 프로젝트 회고</div>
                <ul class="notion-ul" style="margin-bottom: 0;">
                    <li>스프린트 기반의 애자일 개발을 진행하며 요구 변화에 대한 신속한 설계 전환 역량을 내재화할 수 있었습니다.</li>
                    <li>짧은 기간 다수 시스템 개발 압박으로 초기 문서화 작업이 미흡했음을 인지하여, 산출물 템플릿의 중요성을 실감했습니다.</li>
                    <li>단순히 요구사항을 개발하는 것을 넘어, 현업 프로세스를 능동적으로 파악해 불합리한 구조를 근본적으로 개선하는 역할이 아키텍트의 자질이라고 느꼈습니다.</li>
                </ul>
            </div>
            `,
            files: [
                '이마트 Power Apps 프로세스 정의서.pptx'
            ],
            screenshots: [
                { url: 'images/app-1/1.png', caption: '상품권 입금 확인 자동 알림 메일' },
                { url: 'images/app-1/2.png', caption: 'MMS 행사 등록 확인 자동 메일' },
                { url: 'images/app-1/3.png', caption: '거래 정산 승인 자동 알림 프로세스' },
                { url: 'images/app-1/4.png', caption: '거래 정산 반려 알림 및 사유 안내' }
            ],
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
            customHTML: `
            <div class="modal-article" style="padding: 1.5rem;">
                <div class="notion-h2">포스코이앤씨 협력사 라이선스 관리 앱</div>
                
                <!-- 상단 핵심 성과 지표 -->
                <div class="notion-metrics-grid">
                    <div class="metric-card">
                        <span class="metric-value">75%</span>
                        <span class="metric-label">라이선스 관리 시간 단축</span>
                    </div>
                    <div class="metric-card">
                        <span class="metric-value">70%</span>
                        <span class="metric-label">잉여 라이선스 회수율 증가</span>
                    </div>
                    <div class="metric-card">
                        <span class="metric-value">20,000+</span>
                        <span class="metric-label">앱 실 사용자 수</span>
                    </div>
                </div>

                <table class="notion-props-table">
                    <tr>
                        <td class="prop-label"><i class='bx bx-calendar'></i> Date</td>
                        <td class="prop-value">2023.11~2024.01</td>
                    </tr>
                    <tr>
                        <td class="prop-label"><i class='bx bxs-tag-alt'></i> Tags</td>
                        <td class="prop-value">
                            <span class="m-tag" style="background: rgba(9, 132, 227, 0.2); color: #74b9ff;">Azure AD</span>
                            <span class="m-tag">Outlook</span>
                            <span class="m-tag">Power Apps</span>
                            <span class="m-tag" style="background: rgba(131, 56, 236, 0.2); color: #cba6f7;">Power Automate</span>
                            <span class="m-tag" style="background: rgba(225, 112, 85, 0.2); color: #fab1a0;">SharePoint</span>
                            <span class="m-tag" style="background: rgba(253, 121, 168, 0.2); color: #fd79a8;">Teams</span>
                        </td>
                    </tr>
                </table>

                <div class="notion-h3">1. 프로젝트 개요</div>
                <div class="notion-callout">
                    <i class='bx bxs-info-circle'></i>
                    <div class="notion-callout-text">
                        포스코이앤씨 소속 협력사의 방대한 Microsoft 계정 및 라이선스를 효율적으로 관리하기 위해, 기존 3개의 파편화된 프로그램을 통폐합한 단일 Power Apps 애플리케이션을 성공적으로 구축했습니다.
                    </div>
                </div>

                <div class="notion-h3">2. 요구사항 및 역할</div>
                <div class="notion-emoji-title">💼 주요 요구사항</div>
                <ul class="notion-ul">
                    <li>협력사 계정에 E3, F3 라이선스를 신청 후 관리자가 승인/부여하는 프로세스 구축</li>
                    <li>협력사 계정 및 신청자에게 라이선스 부여/회수 결과 알림 및 매달 사용 현황 메일 발송</li>
                    <li>라이선스 만료일 도래 시 권한이 자동 회수되는 보안 프로세스 확립</li>
                    <li>각 협력사 계정 특성에 맞춰 신청 가능한 라이선스 종류의 제한 로직 개발</li>
                    <li>고객사 대상 Power Apps 및 Power Automate 교육 진행</li>
                </ul>

                <div class="notion-emoji-title">👨‍💻 담당 역할 (Project Leader)</div>
                <ul class="notion-ul">
                    <li>PL 역할로 커뮤니케이션 주도, 일정 조율 및 개발 방안/아키텍처 논의</li>
                    <li>Azure 라이선스 그룹 통제 및 API를 통한 사용자 데이터 연동</li>
                    <li>전체 Power Apps 및 Power Automate 아키텍처 설계 및 구현</li>
                    <li>솔루션 기초부터 실무 운영까지 Power Apps / Automate 인수인계 교육(메인 강사) 진행</li>
                </ul>

                <div class="notion-h3">3. 주요 핵심 기술</div>
                <div class="notion-check-title">📐 기술 스택 활용</div>
                <ul class="notion-ul">
                    <li><strong>커스텀 커넥터(API)</strong>: Azure 및 M365 관리 센터에서 사용자 데이터/라이선스 현황을 Power Apps로 직접 연동</li>
                    <li><strong>Power Automate</strong>: 다차원 조건에 따른 라이선스 알림 메일 자동 발송 로직 개발</li>
                    <li><strong>Microsoft Graph/Azure 연동</strong>: Power Automate를 활용해 협력사 권한을 Guest에서 Member로 일시적 전환하는 로직 등 고도화</li>
                </ul>

                <div class="notion-h3">4. 아키텍처 구성 및 주요 페이지</div>
                <div class="notion-table-wrap">
                    <table class="notion-table">
                        <thead>
                            <tr>
                                <th>페이지 구성</th>
                                <th>설명 및 주요 기능</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>조회 및 신청</td><td>Office 365와 연동된 사용자를 검색하여 계정에 맞는 라이선스, 시작/종료일을 입력 후 신청</td></tr>
                            <tr><td>부서별 신청 현황</td><td>사용자의 부서(소속 협력사 등)에서 신청한 모든 라이선스 내역을 롤업하여 확인</td></tr>
                            <tr><td>개인 조회</td><td>사용자가 등록 및 신청한 데이터를 직접 수정하고 갱신 요청하는 페이지</td></tr>
                            <tr><td>신청 현황(승인)</td><td>개별 신청된 관리 데이터를 중앙 관리자가 열람 후 승인/반려 결정</td></tr>
                            <tr><td>메일 수정/발송</td><td>신청 결과통보, 라이선스 만료 7일 전 안내, 매월 사용 내역 등 동적 메일 발송/내용 수정</td></tr>
                            <tr><td>관리자 설정</td><td>시스템 권한을 가진 중앙 관리자 그룹을 등록/삭제하는 컨트롤 패널</td></tr>
                        </tbody>
                    </table>
                </div>

                <div class="notion-h3">5. 문제 해결 및 기술적 도전</div>
                <div class="notion-check-title"><i class='bx bx-check-shield'></i> 문제 사례 1: Azure/M365 관리센터 권한 이슈</div>
                
                <div class="before-after-grid">
                    <div class="ba-item">
                        <span class="ba-label before">Before</span>
                        <div class="ba-value">보안 구역 내 권한 단절</div>
                    </div>
                    <div class="ba-arrow"><i class='bx bx-right-arrow-alt'></i></div>
                    <div class="ba-item">
                        <span class="ba-label after">After</span>
                        <div class="ba-value" style="color: #55efc4;">API 통한 일시적 권한 제어</div>
                    </div>
                </div>

                <div class="notion-quote">
                    협력사 계정이 '게스트' 유형으로 등록되어 있어, 정책 상 일정 시간이 지나면 자동으로 Azure 그룹에서 제거되는 위험이 있었습니다. 고객사는 보안을 위해 게스트에게 상위 권한 부여를 원치 않았습니다.<br><br>
                    <strong>→ 해결 방법</strong>: 직접적인 시스템 권한 할당 대신 커스텀 API를 호출하여 Azure/M365 관리 센터 정보를 연동한 뒤, Power Automate 커스텀 루프를 통해 작업을 수행하는 시점에만 사용자 유형을 한시적으로 '구성원'으로 전환시켜 작업을 완료하는 방식의 우회 아키텍처를 도입했습니다.
                </div>

                <br>
                <div class="notion-check-title"><i class='bx bx-error-circle'></i> 문제 사례 2: 복잡한 라이선스 부여/회수 엣지 케이스</div>
                
                <div class="before-after-grid">
                    <div class="ba-item">
                        <span class="ba-label before">Before</span>
                        <div class="ba-value">요구사항 미정의 재부여</div>
                    </div>
                    <div class="ba-arrow"><i class='bx bx-right-arrow-alt'></i></div>
                    <div class="ba-item">
                        <span class="ba-label after">After</span>
                        <div class="ba-value" style="color: #55efc4;">PL 주관 프로세스 제안 설계</div>
                    </div>
                </div>

                <div class="notion-quote" style="border-left-color: #ff7675;">
                    초기 설계 당시, 라이선스가 이미 부여된 현직 협력사가 재신청을 하거나 만료일을 연장해야 할 경우의 대처 요구사항이 누락되어 있었습니다.<br><br>
                    <strong>→ 해결 방법</strong>: 운영 중 반드시 병목이 발생할 이슈임을 PL로서 선제적으로 파악한 후, 계정 고유 ID값을 기반으로 기보유 협력사 여부를 검증하여 무분별한 중복 부여 차단 로직(유효성 검사)과, 만료 기간을 자동 연장시키는 프로세스를 역제안하여 구축했습니다.
                </div>

                <div class="notion-h3">6. 커뮤니케이션 및 프로젝트 성과</div>
                <div class="notion-emoji-title">🗣️ 커뮤니케이션 및 관리 역량</div>
                <ul class="notion-ul">
                    <li>대면, Teams, Outlook, OneNote를 아우르는 다매체 고객 접점 커뮤니케이션</li>
                    <li>모든 기술 스펙 및 회의록을 OneNote, Teams 환경에 문서화하여 보안 및 자산 공유</li>
                    <li>요구사항 변경 시 과도한 업무 확장을 방지하기 위한 기능 범위(Scope) 제한 및 협상 리딩</li>
                </ul>

                <div class="notion-check-title"><i class='bx bxs-pie-chart-alt-2'></i> 개발 결과 및 향후 회고</div>
                <ul class="notion-ul" style="margin-bottom: 0;">
                    <li><strong>뛰어난 운영 효율 달성</strong>: 기존 3개의 파편화된 프로그램이 하나의 플랫폼에 통합되어 관리자의 작업 피로도가 비약적으로 감소. 그 결과, 협력사 라이선스 관리 시간 75% 대폭 단축 달성.</li>
                    <li><strong>유휴 자산 절감</strong>: 정밀한 사용자 그룹/메일 연동으로, 낭비되던 잉여 라이선스 회수율이 기존 대비 70% 증가됨</li>
                    <li><strong>2만 명의 방대한 사용자 커버</strong>: 약 20,000명의 엔터프라이즈 실 사용자를 에러 없이 수용.</li>
                    <li style="margin-top: 10px; color:#cba6f7;"><strong>프로젝트 회고</strong>: 다음 프로젝트에서는 본 경험을 살려, Microsoft 권한 구조에 대한 이해를 바탕으로 프로젝트 초창기 요구사항 수집에서부터 보안 정책 제약사항을 식별하고 대비 파이프라인을 구축할 예정입니다.</li>
                </ul>
            </div>
            `,
            files: [
                '요구사항명세서.docx',
                '포스코이앤씨_사용자 매뉴얼.pptx',
                '포스코이앤씨_운영자 매뉴얼.pptx',
                '포스코이앤씨_통합 테스트 결과서.docx',
                '포스코이앤씨_화면 정의서.pptx'
            ],
            screenshots: [
                { url: 'images/app-2/1-1.조회 및 신청.png', caption: '라이선스 조회 및 신청 화면' },
                { url: 'images/app-2/2.부서별 조회.png', caption: '부서별 라이선스 현황 조회' },
                { url: 'images/app-2/3.개인조회.png', caption: '개인별 라이선스 내역 상세 조회' },
                { url: 'images/app-2/5.A_신청현황.png', caption: '전체 라이선스 신청 현황 (관리자)' },
                { url: 'images/app-2/6.A_메일수정.png', caption: '협력사 메일 일괄 수정 기능' },
                { url: 'images/app-2/7.A_관리자설정.png', caption: '관리자 권한 및 시스템 설정' }
            ],
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
            files: [],
            screenshots: [],
            startDate: '2024-01-02',
            endDate: '2024-10-01'
        },
        {
            id: 'app-4', type: 'app',
            shortTitle: '덱스컨설팅 프로젝트 관리 시스템', color: '#00b894', icon: 'bx bxs-save',
            bullet1: '프로젝트명: 프로젝트 관리 시스템', bullet2: '100명 사용 통합 관리 시스템',
            title: '내부 앱 개발 - 프로젝트 관리 시스템', company: '덱스컨설팅', duration: '2023.05 ~ 2023.07 (3개월)',
            role: 'Power Apps/Automate 설계 및 개발, Dataverse 설계, 기획/디자인 제안', tech: ['Power Apps', 'Power Automate', 'SharePoint', 'Dataverse', 'Outlook', 'Teams'],
            achievements: '인사팀 수작업 기반 프로젝트 데이터 관리 프로세스 통합 및 실 사용화.',
            desc: '전사 직원의 프로젝트 현황을 통합적으로 관리하고, 기존 Excel 기반의 비효율적인 수작업 프로세스를 Power Apps로 완전 통합하여 업무 프로세스 혁신을 달성했습니다.',
            customHTML: `
            <div class="modal-article" style="padding: 1.5rem;">
                <div class="notion-h2">내부 앱 개발 - 프로젝트 관리 시스템</div>
                
                <!-- 상단 핵심 성과 지표 -->
                <div class="notion-metrics-grid">
                    <div class="metric-card">
                        <span class="metric-value">100+ 명</span>
                        <span class="metric-label">시스템 실 사용자 수</span>
                    </div>
                    <div class="metric-card">
                        <span class="metric-value">Excel → App</span>
                        <span class="metric-label">업무 프로세스 통합/혁신</span>
                    </div>
                    <div class="metric-card">
                        <span class="metric-value">Real-time</span>
                        <span class="metric-label">프로젝트 현황 실시간 파악</span>
                    </div>
                </div>

                <table class="notion-props-table">
                    <tr>
                        <td class="prop-label"><i class='bx bx-calendar'></i> Date</td>
                        <td class="prop-value">2023.05~2023.07</td>
                    </tr>
                    <tr>
                        <td class="prop-label"><i class='bx bxs-tag-alt'></i> Tags</td>
                        <td class="prop-value">
                            <span class="m-tag">Power Apps</span>
                            <span class="m-tag" style="background: rgba(131, 56, 236, 0.2); color: #cba6f7;">Power Automate</span>
                            <span class="m-tag">SharePoint</span>
                            <span class="m-tag" style="background: rgba(225, 112, 85, 0.2); color: #fab1a0;">Dataverse</span>
                            <span class="m-tag">Outlook</span>
                            <span class="m-tag">Teams</span>
                        </td>
                    </tr>
                </table>

                <div class="notion-h3">1. 프로젝트 개요</div>
                <div class="notion-callout">
                    <i class='bx bxs-info-circle'></i>
                    <div class="notion-callout-text">
                        전사 직원의 프로젝트 현황을 통합적으로 관리하기 위해, 기존 Excel 기반의 파편화된 업무 프로세스를 Power Apps로 단일화한 통합 관리 시스템을 구축했습니다.
                    </div>
                </div>

                <div class="notion-h3">2. 요구사항 및 역할</div>
                <div class="notion-emoji-title">💼 주요 요구사항</div>
                <ul class="notion-ul">
                    <li>관리자의 프로젝트 등록, 수정 및 삭제 관리 기능</li>
                    <li>진행상태, 구분, 날짜 등 다각도 검색 필터링이 포함된 조회 기능</li>
                    <li>사용자 이름 기반의 개인별 프로젝트 투입 현황 검색</li>
                    <li>직급별 프로젝트 수당 관리 컨트롤 패널 구축</li>
                </ul>

                <div class="notion-emoji-title">👨‍💻 담당 역할 (App Developer)</div>
                <ul class="notion-ul">
                    <li>전체 Power Apps 및 Power Automate UI/로직 설계 및 개발</li>
                    <li>Dataverse 데이터 모델링 및 기존 Excel 데이터 이관 로직 총괄</li>
                    <li>사용자 편의성 향상을 위한 UI/UX 설계 및 기능 역제안</li>
                </ul>

                <div class="notion-h3">3. 주요 핵심 기술</div>
                <ul class="notion-ul">
                    <li><strong>알림 자동화</strong>: Power Automate를 활용해 프로젝트 투입 및 철수 시 담당자에게 자동으로 알림 메일 발송</li>
                    <li><strong>M365 데이터 연동</strong>: Microsoft 365(Office 365)와 연동하여 실시간 사용자 정보를 불러와 등록/수정 편의성 극대화</li>
                    <li><strong>데이터 무결성 확보</strong>: Dataverse를 활용해 대규모 프로젝트 데이터의 관계형 구조를 안정적으로 설계</li>
                </ul>

                <div class="notion-h3">4. 주요 페이지 구성</div>
                <div class="notion-table-wrap">
                    <table class="notion-table">
                        <thead>
                            <tr>
                                <th>페이지 명</th>
                                <th>설명 및 주요 기능</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>목록 조회</td><td>프로젝트명, 진행상태, 날짜 등으로 전사 현황 검색/조회</td></tr>
                            <tr><td>개인 조회</td><td>특정 사용자 이름 기반의 프로젝트 참여 이력 상세 검색</td></tr>
                            <tr><td>프로젝트 등록/수정</td><td>신규 프로젝트 데이터 입력 및 기존 데이터 수정 인터페이스</td></tr>
                            <tr><td>관리자 패널</td><td>관리자 권한 부여 및 직급별 수당 데이터 통합 관리</td></tr>
                        </tbody>
                    </table>
                </div>

                <div class="notion-h3">5. 문제 해결 및 기술적 도전</div>
                <div class="notion-check-title"><i class='bx bx-check-shield'></i> 문제 사례 1: 복잡한 공수 입력 프로세스</div>
                <div class="notion-quote">
                    <strong>현상</strong>: 다수의 인력을 프로젝트에 등록할 때 인력별 투입 공수(M/M)를 일일이 수동 입력하는 방식에 대한 사용자 불만 제기.<br>
                    <strong>해결</strong>: **슬라이더(Slider) UI**를 도입하여 프로젝트 기간을 직관적으로 설정하고, 공수 입력 시 비율 및 합계가 실시간으로 자동 계산되도록 개발하여 입력 편의성을 비약적으로 높였습니다.
                </div>

                <br>
                <div class="notion-check-title"><i class='bx bx-search-alt'></i> 문제 사례 2: 중복 프로젝트명 식별 어려움</div>
                <div class="notion-quote" style="border-left-color: #ff7675;">
                    <strong>현상</strong>: 프로젝트 수정 시 드롭다운 목록에서만 선택해야 하여, 중복된 이름을 가진 프로젝트를 정확히 찾아내기 어려움.<br>
                    <strong>해결</strong>: 프로젝트명 검색 필터와 드롭다운을 상호 연동시키는 **하이브리드 필터링** 로직을 구현하여 중복된 사례가 있더라도 검색을 통해 정확히 대상을 식별하고 불러오도록 개선했습니다.
                </div>

                <div class="notion-h3">6. 개발 결과 및 프로젝트 성과</div>
                <ul class="notion-ul">
                    <li><strong>효율적인 인력 운영</strong>: 전사 프로젝트 현황 파악 및 효율적인 인력 배정 체계 구축으로 인사팀의 업무 시간 대폭 절감.</li>
                    <li><strong>사용자 만족도</strong>: "투입된 공수를 한눈에 확인할 수 있고 업무 프로세스가 통합되어 매우 편리하다"는 긍정적 피드백 수취.</li>
                    <li><strong>성공적인 시스템 안착</strong>: 약 100여 명의 사내 직원이 실제 업무에 활발히 사용하는 안정적인 시스템으로 자리매김.</li>
                </ul>

                <div class="notion-check-title"><i class='bx bxs-check-circle'></i> 프로젝트 회고</div>
                <div class="notion-quote">
                    단순한 데이터 입력을 넘어, 사용자 중심의 필터링 기능과 UI 개선이 전체 시스템의 완성도와 사용자 경험(UX)에 얼마나 큰 영향을 미치는지 깊게 체감했습니다. 향후 프로젝트에서도 이러한 선제적인 기능 제안 역량을 더욱 강화할 예정입니다.
                </div>
            </div>
            `,
            files: [],
            screenshots: [
                { url: 'images/app-4/목록조회.png', caption: '전사 프로젝트 목록 및 필터링 조회' },
                { url: 'images/app-4/개인조회.png', caption: '개인별 프로젝트 투입 현황 조회' },
                { url: 'images/app-4/상세.png', caption: '프로젝트 투입 인력 및 상세 정보 확인' },
                { url: 'images/app-4/345345.png', caption: '관리자용 수당 설정 및 권한 제어 패널' },
                { url: 'images/app-4/등록.png', caption: '신규 프로젝트 데이터 등록 인터페이스' },
                { url: 'images/app-4/수정.png', caption: '기존 프로젝트 정보 수정 및 이력 관리' }
            ],
            startDate: '2023-05-01',
            endDate: '2023-07-01'
        },
        {
            id: 'app-5', type: 'app',
            shortTitle: '덱스컨설팅 인력 및 역량 관리 시스템', color: '#6c5ce7', icon: 'bx bxs-user-badge',
            bullet1: '전사 인력 및 역량 통합 관리', bullet2: '자격증 만료 알림 및 기술 숙련도 관리',
            title: '내부 앱 개발 - 인력 관리 및 역량 관리 시스템', company: '덱스컨설팅', duration: '2023.04 ~ 2023.05 (2개월)',
            role: 'Power Apps/Automate 설계 및 개발, Dataverse 및 SharePoint 연동 설계', tech: ['Power Apps', 'Power Automate', 'SharePoint', 'Dataverse', 'Outlook', 'Teams'],
            achievements: '전 직원 역량 데이터 통합 및 효율적인 개인 정보 관리 체계 구축.',
            desc: '파편화되어 있던 직원의 역량, 프로필, 자격증 정보를 체계적으로 관리하고, 자격증 만료 알림 기능을 통해 행정적 관리 누락을 완전히 방지했습니다.',
            customHTML: `

            <div class="modal-article" style="padding: 1.5rem;">
                <div class="notion-h2">내부 앱 개발 - 인력 관리 및 역량 관리 시스템</div>
                
                <!-- 상단 핵심 성과 지표 -->
                <div class="notion-metrics-grid">
                    <div class="metric-card">
                        <span class="metric-value">100%</span>
                        <span class="metric-label">역량 데이터 단일화</span>
                    </div>
                    <div class="metric-card">
                        <span class="metric-value">Automatic</span>
                        <span class="metric-label">자격증 만료 알림 체계</span>
                    </div>
                    <div class="metric-card">
                        <span class="metric-value">약 100명</span>
                        <span class="metric-label">사내 실 사용자 수</span>
                    </div>
                </div>

                <table class="notion-props-table">
                    <tr>
                        <td class="prop-label"><i class='bx bx-calendar'></i> Date</td>
                        <td class="prop-value">2023.04~2023.05</td>
                    </tr>
                    <tr>
                        <td class="prop-label"><i class='bx bxs-tag-alt'></i> Tags</td>
                        <td class="prop-value">
                            <span class="m-tag">Power Apps</span>
                            <span class="m-tag" style="background: rgba(131, 56, 236, 0.2); color: #cba6f7;">Power Automate</span>
                            <span class="m-tag">SharePoint</span>
                            <span class="m-tag" style="background: rgba(225, 112, 85, 0.2); color: #fab1a0;">Dataverse</span>
                            <span class="m-tag">Outlook</span>
                            <span class="m-tag">Teams</span>
                        </td>
                    </tr>
                </table>

                <div class="notion-h3">1. 프로젝트 개요</div>
                <div class="notion-callout">
                    <i class='bx bxs-info-circle'></i>
                    <div class="notion-callout-text">
                        기존 Excel로 관리되던 비효율적인 인력 정보 및 역량 관리 프로세스를 Power Apps로 완전 통합하여, 직원의 프로필, 보유 기술 숙련도, 자격증 현황을 실시간으로 관리하는 시스템입니다.
                    </div>
                </div>

                <div class="notion-h3">2. 요구사항 및 역할</div>
                <div class="notion-emoji-title">💼 주요 요구사항</div>
                <ul class="notion-ul">
                    <li>자격증 종류별 인증서 첨부 및 취득/만료일 정밀 관리</li>
                    <li>마이크로소프트 기술 스택별 숙련도 자가 기입 및 조회</li>
                    <li>최신화된 프로필 템플릿 다운로드 및 업로드 커스텀 기능</li>
                    <li>가용 주소지 및 선물 수령지 데이터 관리 모듈</li>
                    <li>관리자용 통합 데이터 조회 및 기준 정보(기술/자격증 종류) 관리</li>
                </ul>

                <div class="notion-emoji-title">👨‍💻 담당 역할 (App Developer)</div>
                <ul class="notion-ul">
                    <li>전체 Power Apps 화면 설계 및 커스텀 로직 개발</li>
                    <li>자격증 만료 알림 및 행정 메일 발송 자동화(Power Automate) 설계</li>
                    <li>Dataverse와 SharePoint를 결합한 하이브리드 데이터베이스 설계</li>
                    <li>현업 애로사항 청취 후 UI/UX 개선안 선제적 제안</li>
                </ul>

                <div class="notion-h3">3. 주요 핵심 기술</div>
                <ul class="notion-ul">
                    <li><strong>알림 자동화</strong>: Power Automate로 자격증 만료 30일 전, 10일 전 담당자에게 알림 메일 발송 로직 구현</li>
                    <li><strong>커스텀 파일 핸들링</strong>: Power Apps 내에서 프로파일 템플릿의 실시간 다운로드 및 업로드 기능 구현</li>
                    <li><strong>권한 기반 조회</strong>: 관리자로 등록된 인원만 전체 데이터를 필터링하여 조회할 수 있는 보안 로직 적용</li>
                </ul>

                <div class="notion-h3">4. 주요 페이지 구성</div>
                <div class="notion-table-wrap">
                    <table class="notion-table">
                        <thead>
                            <tr>
                                <th>페이지 명</th>
                                <th>설명 및 주요 기능</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>홈(Home)</td><td>개인별 등록 데이터 요약 및 통합 대시보드</td></tr>
                            <tr><td>자격증 관리</td><td>자격증 종류 선택, 취득/만료일 기입 및 인증서 파일 동기화</td></tr>
                            <tr><td>기술 숙련도</td><td>보유한 MS 기술들에 대한 숙련도 등급 기입/조회</td></tr>
                            <tr><td>프로파일</td><td>템플릿 다운로드 기반 프로필 최신화 및 관리자 확인 요청</td></tr>
                            <tr><td>관리자 전용</td><td>전 직원 데이터 엑셀 익스포트 및 기술/자격증 마스터 정보 관리</td></tr>
                        </tbody>
                    </table>
                </div>

                <div class="notion-h3">5. 문제 해결 및 기술적 도전</div>
                <div class="notion-check-title"><i class='bx bx-check-shield'></i> 문제 사례 1: 하이브리드 DB 설계 (Dataverse & SharePoint)</div>
                <div class="notion-quote">
                    <strong>현상</strong>: Dataverse에 저장된 자격증 인증서 파일에 인사팀이 외부에서 효율적으로 접근하기 어려운 문제 발생.<br>
                    <strong>해결</strong>: 파일 스토리지는 **SharePoint List**를 연동하여 통합 파일함으로 기능하게 하고, 메타 정보는 **Dataverse**에서 관계형으로 관리하도록 설계를 변경하여 인사팀의 접근성과 관리 효율성을 동시에 확보했습니다.
                </div>

                <br>
                <div class="notion-check-title"><i class='bx bx-export'></i> 문제 사례 2: 데이터 엑셀 익스포트 커스터마이징</div>
                <div class="notion-quote" style="border-left-color: #48dbfb;">
                    <strong>현상</strong>: 정기적인 데이터 브리핑 메일 외에, 인사팀이 상시 필요할 때마다 최신 데이터를 엑셀로 다운로드받고 싶어함.<br>
                    <strong>해결</strong>: Power Apps의 커스텀 파워 연동 기능을 활용해 실시간 데이터를 정제된 포맷으로 변환하여 **사용자가 직접 Export** 받을 수 있는 전용 인터페이스를 추가 구현했습니다.
                </div>

                <div class="notion-h3">6. 개발 결과 및 프로젝트 성과</div>
                <ul class="notion-ul">
                    <li><strong>관리 누락 0건</strong>: 자동 알림 도입 후 자격증 갱신 및 정보 최신화 누락 사례가 단 한 건도 발생하지 않음.</li>
                    <li><strong>업무 효율 향상</strong>: 수작업 기반 관리를 앱으로 단일화하여 사내 행정 업무 시간을 대폭 절감.</li>
                    <li><strong>성공적인 실 사용</strong>: 약 100여 명의 임직원이 실제 자격증 취득 및 역량 관리에 상시 활용 중.</li>
                </ul>

                <div class="notion-check-title"><i class='bx bxs-check-circle'></i> 프로젝트 회고</div>
                <div class="notion-quote">
                    Power Apps와 Power Automate를 연동하여 단순 자동화를 넘어 복잡한 행정 프로세스를 견고하게 구현할 수 있다는 점을 체감했습니다. 특히 사용자의 요구사항 변동에 따른 유연한 설계와 데이터 무결성 유지 역량을 크게 키울 수 있었습니다.
                </div>
            </div>
            `,
            files: [],
            screenshots: [
                { url: 'images/app-5/메인페이지.png', caption: '메인 통합 대시보드' },
                { url: 'images/app-5/자격증입력.png', caption: '자격증 취득 및 인증 정보 입력' },
                { url: 'images/app-5/자격증 입력 2.png', caption: '자격증 만료일 관리 필드' },
                { url: 'images/app-5/기술 입력.png', caption: '보유 기술 종류 선택' },
                { url: 'images/app-5/기술 입력2.png', caption: '기술 숙련도 자가 기입' },
                { url: 'images/app-5/조회.png', caption: '관리자용 데이터 통합 조회 페이지' },
                { url: 'images/app-5/주소지입력.png', caption: '거주지 및 배송 주소 관리' },
                { url: 'images/app-5/파일 업로드.png', caption: '프로필 템플릿 업로드/다운로드' },
                { url: 'images/app-5/234234.png', caption: '관리자 전용 설정 메뉴' },
                { url: 'images/app-5/1231.png', caption: '데이터 요약 프리뷰' },
                { url: 'images/app-5/2344324.png', caption: '시스템 알림 설정' }
            ],
            startDate: '2023-04-01',
            endDate: '2023-05-31'
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

    // --- 실행 (Initial Check) ---
    checkUnlockState();

});
