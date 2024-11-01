<template>

</template>


<script>
import { state } from './dataStore';
    export default {
        setup() {
            return {
                state
            }
        },
        data() {
            return {

            }
        },
        mounted() {
          let prompt = `Giúp tôi quyết định hành động tiếp theo trong vòng pre-flop của ván poker dựa trên các thông tin sau:

Tay bài của tôi: ${hand}

Blinds: 10/5 (Small Blind/Big Blind)

Số người chơi: 6

Số người chơi còn lại trên bàn: ${state.numberOfPlayer}

Vị trí của tôi: ${playerPos} (so với vị trí Dealer)

Stack của tôi: ${state.stackList[playerPos]}

Lịch sử cược:

Pre-Flop:
Người chơi 1: ${state.preFlopActions[0]}
Người chơi 2: ${state.preFlopActions[1]}
Người chơi 3: ${state.preFlopActions[2]}
Người chơi 4: ${state.preFlopActions[3]}
Người chơi 5: ${state.preFlopActions[4]}
Tôi (người chơi 6): ${state.preFlopActions[5]}
Thông tin bổ sung:

Bet lớn nhất hiện tại: ${biggestBetSize}
Tổng pot hiện tại: ${state.pot}
Stack của từng người chơi: ${JSON.stringify(state.stackList)}
Phong cách chơi của đối thủ (nếu có):
Người chơi 1: ${playerStyles[0]}
Người chơi 2: ${playerStyles[1]}
Người chơi 3: ${playerStyles[2]}
Người chơi 4: ${playerStyles[3]}
Người chơi 5: ${playerStyles[4]}
Bạn có thể Fold ${canFold ? "được phép" : "không được phép"} và Check ${canCheck ? "được phép" : "không được phép"}.

Yêu cầu:

Đưa ra hành động phù hợp nhất theo phong cách chơi "tight-passive", ưu tiên gấp nếu tay bài không mạnh.
Trả lời ngắn gọn chỉ với một hành động cụ thể, như: 'Call', 'Raise 20' (có thể raise cao hơn nếu cần), 'Fold', 'Check', hoặc 'All in'.
Không thêm bất kỳ thông tin bổ sung nào ngoài hành động.`
        }
    }

</script>