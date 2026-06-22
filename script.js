document.addEventListener("DOMContentLoaded", function() {
    
    // 1. 取得網頁上要畫圖表的畫布 (Canvas)
    const ctx = document.getElementById('iotChart').getContext('2d');

    // 2. 初始化 Chart.js 圖表 (IoT雙軸動態呈現)
    const iotChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['10:00', '11:00', '12:00', '13:00', '14:00', '現在'],
            datasets: [{
                label: '水溫變化 (°C)',
                data: [24.5, 25.0, 25.8, 26.2, 26.4, 26.5],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                borderWidth: 2,
                yAxisID: 'y',
            }, {
                label: '溶氧量 (mg/L)',
                data: [6.2, 6.0, 5.9, 5.7, 5.6, 5.8],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 2,
                yAxisID: 'y1',
            }]
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: { display: true, text: '溫度 (°C)' }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: { display: true, text: '溶氧量 (mg/L)' },
                    grid: { drawOnChartArea: false },
                },
            }
        }
    });

    // 3. 模擬 IoT 數據即時跳動效果 (每 3 秒)
    setInterval(() => {
        const newTemp = (26 + Math.random()).toFixed(1);
        document.getElementById('temp-val').innerText = `${newTemp} °C`;

        const newDo = (5.5 + Math.random() * 0.5).toFixed(1);
        document.getElementById('do-val').innerText = `${newDo} mg/L`;
    }, 3000);

    // 4. 實作 AI 魚病影像模擬分析功能
    const aiUpload = document.getElementById('ai-upload');
    const aiResult = document.getElementById('ai-result');

    if (aiUpload) {
        aiUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;

            // 顯示掃描中狀態
            aiResult.innerHTML = `<span style="color: #d35400;">⏳ AI 正在分析照片中，請稍候...</span>`;

            // 模擬 AI 運算延遲 2 秒
            setTimeout(() => {
                const rands = Math.random();
                if (rands > 0.5) {
                    aiResult.innerHTML = `
                        <div style="background: #e8f8f5; padding: 10px; border-radius: 5px; border-left: 4px solid #27ae60; text-align: left;">
                            <b style="color: #27ae60;">🟢 AI 診斷結果：健康狀況良好</b><br>
                            <small style="color: #555;">鱗片完整度 98%，活動力評估：高。建議維持目前投餵量。</small>
                        </div>
                    `;
                } else {
                    aiResult.innerHTML = `
                        <div style="background: #fdf2e9; padding: 10px; border-radius: 5px; border-left: 4px solid #e67e22; text-align: left;">
                            <b style="color: #e67e22;">⚠️ AI 預警：疑似輕微車輪蟲感染</b><br>
                            <small style="color: #555;">表皮出現輕微黏液異常。建議：配合 IoT 面板，將溶氧量調高至 6.0 mg/L，並進行局部安全消毒。</small>
                        </div>
                    `;
                }
            }, 2000);
        });
    }
});