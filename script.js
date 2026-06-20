// 當網頁載入完成後執行
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. 取得網頁上要畫圖表的畫布 (Canvas)
    const ctx = document.getElementById('iotChart').getContext('2d');

    // 2. 初始化 Chart.js 圖表
    const iotChart = new Chart(ctx, {
        type: 'line', // 折線圖
        data: {
            labels: ['10:00', '11:00', '12:00', '13:00', '14:00', '現在'], // 時間軸
            datasets: [{
                label: '水溫變化 (°C)',
                data: [24.5, 25.0, 25.8, 26.2, 26.4, 26.5], // 模擬的歷史 IoT 數據
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
                    grid: { drawOnChartArea: false }, // 避免網格線打架
                },
            }
        }
    });

    // 3. 模擬 IoT 數據即時跳動效果
    setInterval(() => {
        // 隨機讓水溫在 26.0 ~ 27.0 之間跳動
        const newTemp = (26 + Math.random()).toFixed(1);
        document.getElementById('temp-val').innerText = `${newTemp} °C`;

        // 隨機讓溶氧量在 5.5 ~ 6.0 之間跳動
        const newDo = (5.5 + Math.random() * 0.5).toFixed(1);
        document.getElementById('do-val').innerText = `${newDo} mg/L`;
    }, 3000); // 每 3 秒更新一次數據
});